var t1 = "test@test.com";
var t2 = "test@dkbmc.com";

const dk = /@dkbmc.com/;

var t3 = t1.match(dk);
console.log('t3 : ' + t3);
var t4 = t2.match(dk);
console.log('t4 : ' + t4);

if(t4 == null) {
    console.log('null');
} else {
    console.log('not null');
}