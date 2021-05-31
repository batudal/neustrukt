// var tl = gsap.timeline({
//     delay: 0.5,
//     repeat: -1, // number of repeats (-1 for infinite)
//     repeatDelay: 0, // seconds between repeats
//     repeatRefresh: true, // invalidates on each repeat
//     yoyo: true, // if true > A-B-B-A, if false > A-B-A-B
//   });

// tl.to(".s1", {duration: 0.5, y: -40}).to(".s2", {duration: 0.5, x: 40}).to(".s3", {duration: 0.5, y: 40}).to(".s4", {duration: 0.5, x: -40})


// gsap.to(".s1", {y: -40, duration: 0.5,delay:1});
// gsap.to(".s2", {x: 40, duration: 0.5,delay:1});
// gsap.to(".s3", {y: 40, duration: 0.5,delay:1});
// gsap.to(".s4", {x: -40, duration: 0.5,delay:1});

// gsap.to(".wholecube", {rotate:90, duration: 0.5, delay:1.5});

// gsap.to(".s1", {y: 0, duration: 0.5,delay:2});
// gsap.to(".s2", {x: 0, duration: 0.5,delay:2});
// gsap.to(".s3", {y: 0, duration: 0.5,delay:2});
// gsap.to(".s4", {x: 0, duration: 0.5,delay:2});

// gsap.to(".wholecube", {rotate:3600/4, duration: 2, delay:2.5, ease:"power1.inOut"});
(function() {
    const blurProperty = gsap.utils.checkPrefix("filter"),
          blurExp = /blur\((.+)?px\)/,
          getBlurMatch = target => (gsap.getProperty(target, blurProperty) || "").match(blurExp) || [];
  
    gsap.registerPlugin({
      name: "blur",
      get(target) {
        return +(getBlurMatch(target)[1]) || 0;
      },
      init(target, endValue) {
        let data = this,
            filter = gsap.getProperty(target, blurProperty),
            endBlur = "blur(" + endValue + "px)",
            match = getBlurMatch(target)[0],
            index;
        if (filter === "none") {
          filter = "";
        }
        if (match) {
          index = filter.indexOf(match);
          endValue = filter.substr(0, index) + endBlur + filter.substr(index + match.length);
        } else {
          endValue = filter + endBlur;
          filter += filter ? " blur(0px)" : "blur(0px)";
        }
        data.target = target; 
        data.interp = gsap.utils.interpolate(filter, endValue); 
      },
      render(progress, data) {
        data.target.style[blurProperty] = data.interp(progress);
      }
    });
  })();

function s1() {
    let tl = gsap.timeline({
        repeatDelay: 3,
        repeat: -1,
    });
    tl.to(".s1", {y: -40, duration: 0.5}).to(".s1", {y: 0, duration: 0.5,delay:0.5});
    return tl;
  }

  function s2() {
    let tl = gsap.timeline({
        repeatDelay: 3,
        repeat: -1,
    });
    tl.to(".s2", {x: 40, duration: 0.5}).to(".s2", {x: 0, duration: 0.5, delay:0.5});
    return tl;
  }

  function s3() {
    let tl = gsap.timeline({
        repeatDelay: 3,
        repeat: -1,
    });
    tl.to(".s3", {y: 40, duration: 0.5}).to(".s3", {y: 0, duration: 0.5, delay:0.5});
    return tl;
  }

  function s4() {
    let tl = gsap.timeline({
        repeatDelay: 3,
        repeat: -1,
    });
    tl.to(".s4", {x: -40, duration: 0.5}).to(".s4", {x: 0, duration: 0.5, delay:0.5});
    return tl;
  }

  function cube() {
    let tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
        defaults: { // children inherit these defaults
            ease: "power1.inOut"
        },
    });
    tl.to(".wholecube", {rotate: 90, duration: 0.5,delay:0.5}).to(".wholecube", {rotate: 1260, duration: 2, delay: 0.5});
    return tl;
  }

  function cube2() {
    let tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
        defaults: { // children inherit these defaults
            ease: "power1.inOut" 
        },
    });
    tl.to(".wholecube", {scale: 0.5, duration: 1, delay:1.5}).to(".wholecube", {scale: 1, duration: 1});
    return tl;
  }

  function colors() {
    let tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
        defaults: { // children inherit these defaults
            ease: "power1.in" 
        },
    });
    tl.to([".side",".corner"], {backgroundColor: '#00E882', duration: 2, delay:1.5}).to([".side",".corner"], {backgroundColor: '#FFFFFF', duration: 2, delay:2.5});
    return tl;
  }

s1()
s2()
s3()
s4()
cube()
cube2()
colors()


// function s2() {
//     let tl = gsap.timeline();
//     tl.to(".s2", {x: 40, duration: 0.5}).to(".s2", {x: 0, duration: 0.5, delay: 1});
//     return tl;
//   }
  
  
//   let master = gsap.timeline()
//     .add(s1())
//     .add(s2())
