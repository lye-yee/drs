import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NavController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.page.html',
  styleUrls: ['./addnews.page.scss'],
})
export class AddnewsPage implements OnInit {

  inserted: boolean = false;
  photo = [];
  news = {
    photo: [],
    time: firebase.database.ServerValue.TIMESTAMP
  }
  highlight = 0;
  authtoast;
  loading;

  constructor(private navCtrl: NavController, private toast: ToastController, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  cancel() {
    this.photo = []
  }

  back() {
    this.navCtrl.navigateBack('tabs/tab2')
  }

  prev(x) {
    if (x > 0) {
      let temp = this.photo[x - 1]
      this.photo[x - 1] = this.photo[x]
      this.photo[x] = temp
      this.highlight = x - 1
    }
  }

  next(x) {
    if (x < this.photo.length - 1) {
      let temp = this.photo[x + 1]
      this.photo[x + 1] = this.photo[x]
      this.photo[x] = temp
      this.highlight = x + 1
    }
  }

  lengthof(x) {
    if (x) {
      return x.length
    } else {
      return 0
    }
  }

  async create() {
    // console.log(this.news['linktype'])
    if (!this.news['title'] || !this.news['short_desc'] || !this.news['desc'] || !this.news['stadate'] || !this.news['exdate'] || !this.news['type'] || !this.news['bprice'] || !this.news['netprice']) {
      this.toastopen('Please fill all blank', 'top', 'warning')
    } else if (this.photo.length == 0) {
      this.toastopen('No Photo Added', 'top', 'warning')
    } else {

      this.showLoader()
      for (let x = 0; x < this.photo.length; x++) {
        this.Picturetolink(this.photo[x].imagec, this.photo[x].imagectype).then((url) => {
          this.news.photo.push(url)
          this.photo[x].ready = true;
        })
      }
      this.saveNews()
    }
  }

  saveNews() {
    setTimeout(() => {
      if (this.checkReady() == true) {
        console.log('Done');
        let key = firebase.database().ref('/news/').push(this.news).key;
        firebase.database().ref('/news/' + key).update({ id: key }).then(async () => {
          this.hideLoader()
          this.navCtrl.navigateRoot('tabs/tab2')
        })

        firebase.database().ref('notifications/' + '/news').push({
          date: firebase.database.ServerValue.TIMESTAMP,
          title: 'Voucher (' + this.news['title'] + ')',
          sdesc: "" + this.news['short_desc'] + "",
          desc: "" + this.news['desc'] + "",
          status:false
        })
      } else {
        this.saveNews()
      }
    }, 1000);
  }

  checkReady() {
    let ready = true
    for (let x = 0; x < this.photo.length; x++) {
      if (this.photo[x].ready == false) {
        ready = false
      }
    }
    return ready
  }

  delete_photo(i) {
    this.photo.splice(i, 1);
    console.log(this.photo)
  }

  Picturetolink(image, imagetype) {
    return new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref();
      var metadata = {
        contentType: imagetype,
      };
      let type = imagetype.replace("image/", "")
      let timestamp = new Date().getTime().toString();
      let storedb = storageRef.child('/News/' + timestamp + '.' + type)
      // Upload the file and metadata
      storedb.putString(image, 'data_url').then(snapshot => {
        console.log(snapshot);
        storedb.getDownloadURL()
          .then(snapshot => {
            console.log(snapshot);
            let url = {
              picture: snapshot
            }
            resolve(snapshot)

          }).catch(function (error) {
            // Handle any errors  
            alert('Error uploading image')
            reject(new Error(error))
          });
      });
    })
  }

  fileChange(event, x) {
    if (event.target.files && event.target.files[0] && event.target.files[0].size < (1048576 * 8)) {
      var canvas = <HTMLCanvasElement>document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var cw = canvas.width;
      var ch = canvas.height;
      var maxW = 1000;
      var maxH = 1000;


      console.log('ji')

      var img = new Image;
      img.onload = () => {
        var iw = img.width;
        var ih = img.height;
        var scale = Math.min((maxW / iw), (maxH / ih));
        var iwScaled = iw * scale;
        var ihScaled = ih * scale;
        canvas.width = iwScaled;
        canvas.height = ihScaled;
        ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
        console.log(x)
        if (x > -1) {
          this.photo[x].imagectype = event.target.files[0].type;
          this.photo[x].imagec = canvas.toDataURL("image/" + event.target.files[0].type, 1);
          this.photo[x].ready = false
          console.log(this.photo)

        } else {
          this.photo.push({
            imagectype: event.target.files[0].type,
            imagec: canvas.toDataURL("image/" + event.target.files[0].type, 1),
            ready: false
          })
          console.log(this.photo)

        }

      }

      img.src = URL.createObjectURL(event.target.files[0]);
    } else {
      alert("Your Current Image Too Large, " + event.target.files[0].size / (1024 * 1024) + "MB! (Please choose file lesser than 8MB)")
    }
  }

  async showLoader() {
    this.loading = await this.loadingController.create({
      message: 'Creating...'
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    // this.hideLoader();
  }

  async hideLoader() {
    await this.loadingController.dismiss();
  }

  async toastopen(msg, position, color) {
    this.authtoast = await this.toast.create({
      color: color,
      animated: true,
      message: msg,
      position: position,
      cssClass: "toast",
      duration: 2000
    });
    this.authtoast.present();
  }

}