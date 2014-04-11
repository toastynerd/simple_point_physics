'use strict';

document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
  var canvas1 = document.getElementById('canvas1');
  var context1 = canvas1.getContext('2d');
  var friction = 1.5;

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
        if(this.position.x > maxX || this.position.x < 0) {
          this.velocity.x *= -1;
        }
        if(this.position.y > maxY || this.position.y < 0) {
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
      particles[i].forces.push(new Force(0, 0, 1));
    }
  }

  function drawScreenHolder() {
    drawScreen(context1, canvas1, particles);
  }

  for(var i = 0; i < 200; i++) {
    var particle = new Particle(Math.random() * canvas1.width, Math.random() * canvas1.height);
    particle.forces.push(new Force((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, Math.random() * 5));
    particles.push(particle);
  }
  setInterval(drawScreenHolder, 33);
}
