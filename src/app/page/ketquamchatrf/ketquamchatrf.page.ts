import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/providers/service.service';
import { ToastServiceService } from 'src/app/providers/toast-service.service';
import { Router, NavigationExtras, RouterModule } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { SendmailmchatrfPage } from '../sendmailmchatrf/sendmailmchatrf.page';
import { Network } from '@ionic-native/network/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-ketquamchatrf',
  templateUrl: './ketquamchatrf.page.html',
  styleUrls: ['./ketquamchatrf.page.scss'],
})
export class KetquamchatrfPage implements OnInit {
  children = null;
  data: any;
  child: any;
  name: any;
  cid: any;
  dob: any;
  profile: any;
  nameanwser: any;
  createat: any;
  score: any;
  ketqua: any;
  text: any;
  desciptions: any;
  link: any;
  detail: any;
  checkopen = false;
  checkopen1 = false;
  checkopen2 = false;
  checkopen3 = false;
  imgChilder = "assets/icon/iconchilmale0.png";
  constructor(
    public navCtr: NavController,
    public service: ServiceService,
    public router: Router,
    public modalController: ModalController,
    public toast: ToastServiceService,
    public netWork: Network,
    public iab: InAppBrowser,

  ) {
    this.data = this.router.getCurrentNavigation().extras.queryParams;
    this.service.Page = "ketqua";
    this.service.backPage = this.data.pageKQ
  }

  ionViewDidEnter() {
    this.service.Page = "ketqua";
  }
  ngOnInit() {
    this.GetResutlmcharRF();
  }
  History() {

    let navigationExtras: NavigationExtras = {
      queryParams: this.data.createdId
    };
    this.router.navigate(['/update-mchat-rf-view'], navigationExtras);
  }
  opendanhgia() {
    this.checkopen = !this.checkopen
  }
  opendanhgia1() {
    this.checkopen1 = !this.checkopen1
  }
  opendanhgia2() {
    this.checkopen2 = !this.checkopen2
  }
  opendanhgia3() {
    this.checkopen3 = !this.checkopen3
  }
  GetResutlmcharRF() {
    if (this.netWork.type.toUpperCase() != "NONE") {
      this.service.postGet(this.service.getHost() + 'mchatr/answersheets/' + this.data.createdId).subscribe
        (rs => {

          var result = rs.json();
          this.children = result;
          var randon = this.children.child.cid % 6;
          if (this.children.child.gender == 'male') {
            this.imgChilder = "assets/icon/iconchilmale" + randon + ".png";
          }
          else {
            this.imgChilder = "assets/icon/iconchilfemale" + randon + ".png";
          }
          this.name = this.children.child.name;
          this.cid = this.children.child.cid;
          this.dob = this.children.child.birthDate.day + "-" + this.children.child.birthDate.month + "-" + this.children.child.birthDate.year;
          this.nameanwser = this.children.profile != undefined ? this.children.profile.name : "";
          this.createat = moment(this.children.createdAt).format("DD-MM-YYYY");
          this.score = this.children.followupScore;
          if (this.children.score <= 2) {
            this.ketqua = 'Nguy cơ thấp';
            this.text = 'Kết quả cho thấy bạn không cần phải lo lắng nguy cơ tự kỷ của trẻ. Bạn chưa cần phải hành động gì trừ khi trong quá trình theo dõi bạn thấy lo lắng về sự phát triển hay các dấu hiệu nguy cơ tự kỷ của trẻ. Lúc đó hãy đến cơ sở y tế chuyên khoa nhi để thăm khám.'
            if (this.children.child.ageInMonths < 24) {
              this.desciptions = 'Bạn nên quay lại ứng dụng sau sinh nhật 2 tuổi của trẻ để thực hiện lại M-CHAT-R.'
            }
            else {
              this.desciptions = "";
            }
            this.link = '';
            this.detail = '';
          }
          else if (this.children.score >= 3 && this.children.score <= 7) {
            if (this.score < 2) {
              this.ketqua = 'Nguy cơ thấp';
              this.text = 'Kết quả cho thấy bạn không cần phải lo lắng nguy cơ tự kỷ của trẻ. Bạn chưa cần phải hành động gì trừ khi trong quá trình theo dõi bạn thấy lo lắng về sự phát triển hay các dấu hiệu nguy cơ tự kỷ của trẻ. Lúc đó hãy đến cơ sở y tế chuyên khoa nhi để thăm khám.'
              if (this.children.child.ageInMonths < 24) {
                this.desciptions = 'Bạn nên quay lại ứng dụng sau sinh nhật 2 tuổi của trẻ để thực hiện lại M-CHAT-R.'
              }
              else {
                this.desciptions = "";
              }
              this.link = '';
              this.detail = '';
            }
            else {
              this.ketqua = 'Nguy cơ cao',
                this.text = 'Kết quả của sàng lọc cho thấy trẻ có nguy cơ tự kỷ. Bạn nên đến các cơ sở có uy tín về đánh giá và chẩn đoán tự kỷ để xác định tình trạng của con mình. Bạn có thể tìm thấy tên và địa chỉ của các cơ sở trong',
                this.desciptions = '  Danh sách một số cơ sở y tế được tập huấn và hiện đang có thực hiện đánh giá và chẩn đoán tự kỷ',
                this.link = 'https://stage.a365.vn/kien-thuc/bai-viet/danh-sach-mot-so-co-so-y-te-duoc-tap-huan-va-hien-dang-co-thuc-hien-danh-gia-va-chan-doan-tu-ky-13580a686b',
                this.detail = ''
            }
          }
          else (
            this.ketqua = 'Nguy cơ cao',
            this.text = 'Kết quả của sàng lọc cho thấy trẻ có nguy cơ tự kỷ. Bạn nên đến các cơ sở có uy tín về đánh giá và chẩn đoán tự kỷ để xác định tình trạng của con mình. Bạn có thể tìm thấy tên và địa chỉ của các cơ sở trong',
            this.desciptions = '  Danh sách một số cơ sở y tế được tập huấn và hiện đang có thực hiện đánh giá và chẩn đoán tự kỷ',
            this.link = 'https://stage.a365.vn/kien-thuc/bai-viet/danh-sach-mot-so-co-so-y-te-duoc-tap-huan-va-hien-dang-co-thuc-hien-danh-gia-va-chan-doan-tu-ky-13580a686b',
            this.detail = ''
          )
          if (this.service.CheckLoading) {
            this.service.CheckLoading = false;
            this.toast.DismissToast();
          };
        }, error => {
          if (this.service.CheckLoading) {
            this.service.CheckLoading = false;
            this.toast.DismissToast();
          };
        });
    } else {
      if (this.service.CheckLoading) {
        this.service.CheckLoading = false;
        this.toast.DismissToast();
      };
      this.service.message("Vui lòng kiểm tra đường truyền internet!");
    }
  }
  backpage() {
    this.router.navigate([this.data.pageKQ])
  }
  checkSendMail = false;
  async sendmail() {
    if (!this.checkSendMail) {
      this.checkSendMail = true; {
        const myModal = await this.modalController.create({
          component: SendmailmchatrfPage,
          componentProps: {
            createdId: this.data
          },
          cssClass: ""

        });
        myModal.onDidDismiss().then(rs => {
          this.checkSendMail = false;
        });
        return await myModal.present();
      }
    }
  }
  OpenLink() {
    if (this.link != "" ) {
      this.router.navigate(["/list-healthfaciliti"])
    }
  }
}
