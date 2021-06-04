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

// gsap.to(".wholecube", {
//   scrollTrigger:{
//     trigger: ".wholecube",
//     start: "center center",
//     end: "center top",
//     pin: true,
//     markers: true,
//   },
// });

// gsap.fromTo(".alldivs",{y: -10},{y:0, duration:3});
gsap.fromTo(".t1",{x: 45},{x:0, duration:1, ease:"power1.out"});
gsap.fromTo(".wholecube",{x: -45},{x:0, duration:1, ease:"power1.out"});
gsap.fromTo(".button",{opacity: 0},{opacity:1, duration:2, delay:0.25, ease:"power1.inOut"});

function mytext() {
  let tl = gsap.timeline({
    repeat: -1,
  });
  tl.to("h1 span", {text: "", duration: 1, delay:1})
  .to("h1 span", {text: "Scalable", duration: 1, delay:1})
  .to("h1 span", {text: "", duration: 1, delay:1})
  .to("h1 span", {text: "Sustainable", duration: 1, delay:1})
  .to("h1 span", {text: "", duration: 1, delay:1})
  .to("h1 span", {text: "Accessible", duration: 1, delay:1})
  .to("h1 span", {text: "", duration: 1, delay:1})
  .to("h1 span", {text: "Modular", duration: 1, delay:1});
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

//   function colors() {
//     let tl = gsap.timeline({
//         repeat: -1,
//         repeatDelay: 0,
//         defaults: { // children inherit these defaults
//             ease: "power1.in" 
//         },
//     });
//     tl.to([".side",".corner"], {backgroundColor: '#5DCCEF', duration: 2, delay:1.5})
//       .to([".side",".corner"], {backgroundColor: '#5D7DEF', duration: 2, delay:2.5})
//       .to([".side",".corner"], {backgroundColor: '#B85DEF', duration: 2, delay:2.5})
//       .to([".side",".corner"], {backgroundColor: '#EF5DA8', duration: 2, delay:2.5})
//       .to([".side",".corner"], {backgroundColor: '#EF775D', duration: 2, delay:2.5})
//       .to([".side",".corner"], {backgroundColor: '#EFC65D', duration: 2, delay:2.5})
//       .to([".side",".corner"], {backgroundColor: '#AFEF5D', duration: 2, delay:2.5})
//       .to([".side",".corner"], {backgroundColor: '#00E882', duration: 2, delay:2.5});
//     return tl;
//   }

//   function midcube() {
//     let tl = gsap.timeline({
//         repeat: -1,
//         repeatDelay: 1,
//         defaults: { // children inherit these defaults
//             ease: "power1.in" 
//         },
//     });
//     tl.to(".midcube", {backgroundColor: '#00E882', duration: 2, delay:1.5}).to(".midcube", {backgroundColor: '#222222', duration: 2, delay:2.5});
//     return tl;
//   }


// gsap.to(".wholecube", {rotate:3600/4, duration: 2, delay:2.5, ease:"power1.inOut"});
// (function() {
//     const blurProperty = gsap.utils.checkPrefix("filter"),
//           blurExp = /blur\((.+)?px\)/,
//           getBlurMatch = target => (gsap.getProperty(target, blurProperty) || "").match(blurExp) || [];
  
//     gsap.registerPlugin({
//       name: "blur",
//       get(target) {
//         return +(getBlurMatch(target)[1]) || 0;
//       },
//       init(target, endValue) {
//         let data = this,
//             filter = gsap.getProperty(target, blurProperty),
//             endBlur = "blur(" + endValue + "px)",
//             match = getBlurMatch(target)[0],
//             index;
//         if (filter === "none") {
//           filter = "";
//         }
//         if (match) {
//           index = filter.indexOf(match);
//           endValue = filter.substr(0, index) + endBlur + filter.substr(index + match.length);
//         } else {
//           endValue = filter + endBlur;
//           filter += filter ? " blur(0px)" : "blur(0px)";
//         }
//         data.target = target; 
//         data.interp = gsap.utils.interpolate(filter, endValue); 
//       },
//       render(progress, data) {
//         data.target.style[blurProperty] = data.interp(progress);
//       }
//     });
//   })();