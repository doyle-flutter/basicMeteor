import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './temp.html';
import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0 --- Statement
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.myTemp.onCreated(function myTemp(){
  console.log("MyTEMP!");
});

Template.myTemp.helpers({
  hi(){
    console.log('HI!!!!')
    return "HI!!!!!";
  }
});

Template.myTemp.events({
  'click'(e, i){
    console.log('e',e);
    console.log("i",i);
  }
});
