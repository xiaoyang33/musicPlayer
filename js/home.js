
// $.get('http://192.168.1.45:3000/home',{
//   type:'new'
// },(e)=>{
//   console.log(e.musicList);
// })

// let xhr = new XMLHttpRequest();
// xhr.open('get','http://192.168.1.45:3000/home?type=new')
// xhr.send();
// xhr.onload = function(){
//   console.log(JSON.parse(xhr.responseText));
// }


function getMusci(options) {
  $.get(options.url, options.data, options.succ)
}
// 推荐参数
let recommend = {
  url: 'http://192.168.1.45:3000/home',
  data: {
    type: 'recommend'
  },
  succ(e) {
    // console.log(e.musicList);
    let arr = e.musicList;
    arr.forEach((val) => {
      let template = `
      <li>
        <img src="${val.imgurl}" alt="">
        <div class="word">
          <p>${val.info}</p>
        <span>${val.title}</span>
        </div>
      </li> 
      `
      $('.music-list').append(template)
    })
  }
}
// 最新参数
let newList = {
  url: 'http://192.168.1.45:3000/home',
  data: {
    type: 'new'
  },
  succ(e) {
    console.log(e.musicList);
    let arr = e.musicList;
    arr.forEach((val) => {
      let template = `
      <li>
        <img src="${val.imgurl}" alt="">
        <div class="word">
          <p>${val.info}</p>
        <span>${val.title}</span>
        </div>
      </li> 
      `
      $('.music-list').append(template)
    })
  }
}
// banner图参数
let banner  = {
  url: 'http://192.168.1.45:3000/home',
  data: {
    type: 'banner'
  },
  succ(e) {
    let arr = e.imglist;
    // console.log(arr);
    arr.forEach((val) => {
      let template = `
      <div class="swiper-slide">
        <img src="${val}" alt="">
      </div>
      `
      $('.swiper-wrapper').append(template)
    })
    const mySwiper = new Swiper('.swiper-container', {
      loop: true, // 循环模式选项
      speed: 500,
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: {
        delay: 2000
      },
    
    }) 
  }
}
getMusci(banner)
getMusci(recommend)

// music列表切换
$(".nav-list div span").on('click', function () {
  $(this).addClass('active').siblings('span').removeClass('active')
  var a = $(this).html()
  if (a === '最新') {
    $('.music-list').empty();
    getMusci(newList)
  }else{
    $('.music-list').empty();
    getMusci(recommend)
  }
})


// 音乐播放栏目
let audio  = document.querySelector('#audio');
audio.setAttribute('src',"./music/music.mp3")
let flag = true
$('.parse').on('click',function(){
  if(flag){
    $('.parse').css({
      'background-image': 'url(./img/home-img/ziyuan.png)'
    })
    flag = false
    audio.play();
  }else{
    flag = true
    audio.pause()
    $('.parse').css({
      'background-image': 'url(./img/home-img/home-4.png)'
    })
  }
})


// 播放列表的显示与隐藏
let flag1 = true;
$('.right .list').on('click',function(){
  if(flag1){
    flag1=false
    $(this).siblings('.small-list').animate({
      right:0
    })
  }else{
    flag1=true
    $(this).siblings('.small-list').animate({
      right:-100+'%'
    })
  }
})













// 页面放大缩小
function resize() {

  let cliwid = document.documentElement.clientWidth;

  let font = cliwid / 750 * 100 + 'px'

  document.querySelector('html').style.fontSize = font;

}
resize()
window.onresize = resize;

