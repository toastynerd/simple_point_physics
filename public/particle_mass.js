'use strict';

document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
  var canvas1 = document.getElementById('canvas1');
  var context1 = canvas1.getContext('2d');
  //global configs
  var friction = 0.0;
  var gravity = 0.0;

  //bounces
  var bounceLeft = false;
  var bounceRight = false;
  var bounceTop = false;
  var bounceBot = false;

  //starting position
  var numParts = 50;
  var startX = canvas1.width / 2;
  var startY = canvas1.height / 2;
  var startRandomness = 0;

  //starting forces
  var forceLeft = 1.0;
  var forceRight = 1.0;
  var forceUp = 1.0;
  var forceDown = 1.0;
  var forceDuration = 1.0;

  var particles = [];

  var Force = function(x, y, d, name) {
    var force = {
      name: name,
      x: x,
      y: y,
      duration: d
    }
    return force;
  }

  var Particle = function(x, y, mass) {
    var particle = {
      position: {x: x, y: y},
      velocity: {x: 0, y: 0},
      accel: {x: 0, y: 0},
      mass: mass,
      forces: [],
      updateParticle: function(maxX, maxY) {
        for(var i = 0; i < this.forces.length; i++) {
          this.velocity.x += this.forces[i].x;
          this.velocity.y += this.forces[i].y;
          this.forces[i].duration -= 1;
          if(this.forces[i].duration <= 0){
            this.forces.splice(i, 1);
          }
        };

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if((this.position.x > maxX && bounceRight) || (this.position.x < 0 && bounceLeft)) {
          this.velocity.x *= -1;
        }
        if((this.position.y > maxY && bounceBot) || (this.position.y < 0 && bounceTop)) {
          this.velocity.y *= -1;
        }
      },
      drawParticle: function(context) {
        context.fillStyle = '#fff';
        context.fillRect(this.position.x, this.position.y,2,2);
      }
    }
    return particle;
  }

  var drawScreen = function(context, canvas, particles) {
    context.fillStyle = '#000';
    context.fillRect(0,0, canvas.width, canvas.height);
    for(var i = 0; i < particles.length; i++) {
      particles[i].drawParticle(context);
      particles[i].updateParticle(canvas.width, canvas.height);
      particles[i].forces.push(new Force(0, gravity, 1));
      particles[i].forces.push(new Force(particles[i].velocity.x * -friction, particles[i].velocity.y * -friction, 1));
    }
  }

  function drawScreenHolder() {
    drawScreen(context1, canvas1, particles);
  }

  function particleInit() {
    particles = [];
    for(var i = 0; i < numParts; i++) {
      var particle = new Particle(startX + Math.random() * startRandomness - startRandomness, startY + Math.random() * startRandomness - startRandomness);
      particle.forces.push(new Force(-forceLeft * Math.random(), 0, Math.random() * forceDuration));
      particle.forces.push(new Force(forceRight * Math.random(), 0, Math.random() * forceDuration));
      particle.forces.push(new Force(0, forceDown * Math.random(), Math.random() * forceDuration));
      particle.forces.push(new Force(0, -forceUp * Math.random(), Math.random() * forceDuration));
      particles.push(particle);
    }
  }
  setInterval(drawScreenHolder, 33);


  //event listeners
  $('#start_simulation').click(function(){
    particleInit();
  });

  $('#gravity').on('change', function(){
    gravity = parseFloat($(this).val());
  });

  $('#friction').on('change', function(){
    friction = parseFloat($(this).val());
  });

  $('#bounce_left').on('change', function(){
    bounceLeft = !!$(this).val();
  });

  $('#bounce_right').on('change', function(){
    bounceRight = !!$(this).val();
  });

  $('#bounce_top').on('change', function(){
    bounceTop = !!$(this).val();
  });

  $('#bounce_bot').on('change', function(){
    bounceBot = !!$(this).val();
  });

  $('#numParts').on('change', function(){
    numParts = parseInt($(this).val());
  });

  $('#startX').on('change', function(){
    startX = parseInt($(this).val());
  });

  $('#startY').on('change', function(){
    startY = parseInt($(this).val());
  });

  $('#startRandomness').on('change', function(){
    startRandomness = parseFloat($(this).val());
  });

  $('#forceLeft').on('change', function(){
    forceLeft = parseFloat($(this).val());
  });

  $('#forceRight').on('change', function(){
    forceRight = parseFloat($(this).val());
  });

  $('#forceUp').on('change', function(){
    forceUp = parseFloat($(this).val());
  });

  $('#forceDown').on('change', function(){
    forceDown = parseFloat($(this).val());
  });

  $('#forceDuration').on('change', function(){
    forceDuration = parseFloat($(this).val());
  });
}
