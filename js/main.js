// var tl = gsap.timeline({
//     delay: 0.5,
//     repeat: -1, // number of repeats (-1 for infinite)
//     repeatDelay: 0, // seconds between repeats
//     repeatRefresh: true, // invalidates on each repeat
//     yoyo: true, // if true > A-B-B-A, if false > A-B-A-B
//   });
// tl.to(".s1", {duration: 0.5, y: -40}).to(".s2", {duration: 0.5, x: 40}).to(".s3", {duration: 0.5, y: 40}).to(".s4", {duration: 0.5, x: -40})

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);



gsap.to("#scroll-1", {
  scrollTrigger:{
    trigger: "#scroll-1",
    start: "top 100",
    endTrigger: "#scroll-4",
    end: "top 120",
    scrub: 1.5,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  },
  scale: 0.9,
});

gsap.to("#scroll-2", {
  scrollTrigger:{
    trigger: "#scroll-2",
    start: "top 115",
    endTrigger: "#scroll-4",
    end: "top 120",
    scrub: 1.5,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,

    },
  scale: 0.92,
});

gsap.to("#scroll-3", {
  scrollTrigger:{
    trigger: "#scroll-3",
    start: "top 130",
    endTrigger: "#scroll-4",
    end: "top 120",
    scrub: 1.5,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,

  },
  scale: 0.94,
});

// var mylement = document.querySelector(".toggle");
// var togglestate = false;

// mylement.onclick = function() {
//   if (togglestate == false){
//     gsap.to(".toggle-button",{x:20, duration:0.3});
//     gsap.to(".toggle",{backgroundColor:"#f2f2f2", duration:0.3});
//     togglestate = true;
//     gsap.to("html", {backgroundColor:"#ffffff"});
//     gsap.to("h1", {color:"#202020"});
//     gsap.to("h3", {color:"#202020"});
//     gsap.to(".side", {backgroundColor: "#dddddd"});
//     gsap.to(".scroll", {backgroundColor: "#ffffff"});
//     gsap.to("p", {color: "#202020"});
//     gsap.to(".card-side", {backgroundColor: "#f2f2f2"});
//     gsap.to("#scroll-wrapper", {backgroundColor: "#f5f5f5"});

//   }
//   else{
//     gsap.to(".toggle-button",{x:0, duration:0.3});
//     gsap.to(".toggle", {backgroundColor:"#3f3f3f", duration:0.3});
//     togglestate = false;
//     gsap.to("html", {backgroundColor:"#191919"});
//     gsap.to("h1", {color:"#ffffff"});
//     gsap.to("h3", {color:"#ffffff"});
//     gsap.to(".side", {backgroundColor: "#3f3f3f"});
//     gsap.to(".scroll", {backgroundColor: "#202020"});
//     gsap.to("p", {color: "#ffffff"});
//     gsap.to(".card-side", {backgroundColor: "#202020"});

// }};

// gsap.to(mylement,{x:20, duration:1});

// var closeTrigger = $('.toggle');

//         document.getElementById('.toggle').onclick=function(){
//           x:30;
//         }

// gsap.to(".wholecube", {
//   scrollTrigger:{
//     trigger: ".wholecube",
//     start: "center center",
//     end: "center top",
//     pin: true,
//     markers: true,
//   },
// });

gsap.fromTo(".headline-container",{x: 45},{x:0, duration:1, ease:"power1.out"});
gsap.fromTo(".wholecube",{x: -45},{x:0, duration:1, ease:"power1.out"});
gsap.fromTo(".button",{opacity: 0},{opacity:1, duration:2, delay:0.25, ease:"power1.inOut"});
gsap.fromTo(".navigation-bar", {opacity:0},{opacity:1, duration:2, delay:1});

function mytext() {
  let tl = gsap.timeline({
    repeat: -1,
  });
  tl.to(".headline h1 span", {text: "", duration: 1, delay:1})
  .to(".headline h1 span", {text: "Scalable", duration: 1, delay:1})
  .to(".headline h1 span", {text: "", duration: 1, delay:1})
  .to(".headline h1 span", {text: "Sustainable", duration: 1, delay:1})
  .to(".headline h1 span", {text: "", duration: 1, delay:1})
  .to(".headline h1 span", {text: "Accessible", duration: 1, delay:1})
  .to(".headline h1 span", {text: "", duration: 1, delay:1})
  .to(".headline h1 span", {text: "Modular", duration: 1, delay:1});
  return tl;
};

function s1() {
    let tl = gsap.timeline({
        repeatDelay: 2.25,
        repeat: -1,
    });
    tl.to(".s1", {y: -40, duration: 0.5}).to(".s1", {y: 0, duration: 0.5,delay:0.5});
    return tl;
  }

  function s2() {
    let tl = gsap.timeline({
        repeatDelay: 2.25,
        repeat: -1,
    });
    tl.to(".s2", {x: 40, duration: 0.5}).to(".s2", {x: 0, duration: 0.5, delay:0.5});
    return tl;
  }

  function s3() {
    let tl = gsap.timeline({
        repeatDelay: 2.25,
        repeat: -1,
    });
    tl.to(".s3", {y: 40, duration: 0.5}).to(".s3", {y: 0, duration: 0.5, delay:0.5});
    return tl;
  }

  function s4() {
    let tl = gsap.timeline({
        repeatDelay: 2.25,
        repeat: -1,
    });
    tl.to(".s4", {x: -40, duration: 0.5}).to(".s4", {x: 0, duration: 0.5, delay:0.5});
    return tl;
  }

  function cube() {
    let tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.25,
        defaults: { // children inherit these defaults
            ease: "back.inOut"
        },
    });
    tl.to(".wholecube", {rotate: 90, duration: 0.5,delay:0.5,}).to(".wholecube", {rotate: 540, duration: 2, delay: 0.5});
    return tl;
  }

  function cube2() {
    let tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.25,
    });
    tl.to(".wholecube", {scale: 0.8, duration: 1, delay:1.5, ease:"power1.in"}).to(".wholecube", {scale: 1, duration: 1,ease:"power1.out"});
    return tl;
  }


s1()
s2()
s3()
s4()
cube()
cube2()
mytext()

function card_side_1() {
  let tl = gsap.timeline({
      repeatDelay: 2,
      repeat: -1,
  });
  tl.to("#card-side-1", {top: "40px",left: "60px", duration: 1})
    .to("#card-side-1", {top:"68px", left:"64px", duration: 1, delay:1});
  return tl;
}

function card_side_2() {
  let tl = gsap.timeline({
      repeatDelay: 2,
      repeat: -1,
  });
  tl.to("#card-side-2", {rotate: 90, top:"90px", left:"10px", duration: 1})
    .to("#card-side-2", {rotate: 0, top:"92px", left:"64px", duration: 1, delay:1});
  return tl;
}

function card_side_3() {
  let tl = gsap.timeline({
      repeatDelay: 2,
      repeat: -1,
      ease: "power1.inOut",
  });
  tl.to("#card-side-3", {rotate: 90, top:"90px", left:"110px", duration: 1})
    .to("#card-side-3", {rotate: 0, top:"116px", left:"64px", duration: 1, delay:1});
  return tl;
}

function card_side_4() {
  let tl = gsap.timeline({
      repeatDelay: 2,
      repeat: -1,
      ease: "power1.inOut",
  });
  tl.to("#card-side-4", {left:"60px", duration: 1})
    .to("#card-side-4", {left:"64px", duration: 1, delay:1});
  return tl;
}

function card_corner_1() {
  let tl = gsap.timeline({
      repeatDelay: 2,
      repeat: -1,
      ease: "power1.inOut",
  });
  tl.to("#card-corner-1", {top:"40px", duration: 1})
    .to("#card-corner-1", {top:"68px", duration: 1, delay:1});
  return tl;
}

function card_corner_2() {
  let tl = gsap.timeline({
      repeatDelay: 2,
      repeat: -1,
      ease: "power1.inOut",
  });

  tl.to("#card-corner-2", {top:"40px", left:"140px", duration: 1})
    .to("#card-corner-2", {top:"92px", left:"40px", duration: 1, delay:1});
  return tl;
}

function card_corner_3() {
  let tl = gsap.timeline({
      repeatDelay: 2,
      repeat: -1,
      ease: "power1.inOut",
  });
  tl.to("#card-corner-3", {top:"140px", left:"140px", duration: 1})
    .to("#card-corner-3", {top:"116px", left:"40px", duration: 1, delay:1});
  return tl;
}

card_side_1()
card_side_2()
card_side_3()
card_side_4()

card_corner_1()
card_corner_2()
card_corner_3()