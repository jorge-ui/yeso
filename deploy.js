const ghpages = require('gh-pages');

ghpages.clean()
console.log("starting deployment");
ghpages.publish('dist', {
  user: {
    name: 'jorge-ui',
    email: 'jorge.softwaredesigner@gmail.com'
  }
}, err => {
  console.log(err);
}).then(res => {
  console.log(res);
});
