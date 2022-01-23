var express = require('express');
var router = express.Router();


router.get('/', function(req, res)  {
res.render('index', { title: 'Express',data : false });
});

router.post('/', function(req, res)  {
  const data =  validation(req.body);

  if(data== 'Success' && req.body.city =='pune')
  {
    res.status(200).json({
      status: 'succes',
      data: req.body,
    })
  }
  else 
  {
    res.render('index', {data : data } );
    res.status(204);
  }

});

function  validation(formdata) {
var  message = {};
var pwd_expression = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]).{5,11}$/;
var letters = /^[A-Za-z]+$/;
var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

if(formdata.name=='' ||  formdata.email == '' || formdata.password == '' || formdata.city == '' || formdata.username == '' || formdata.confirmpassword =='')
{ message.errorfield ='filed empty'  }
else  {
 if (!letters.test(formdata.name)) {message.errorname='Name field required only alphabet characters ' }
 if (!filter.test(formdata.email)) {message.erroremail = 'invalid Email' }
 if (!letters.test(formdata.city)) {message.errorcity='City field required only alphabet characters' }
 if (!pwd_expression.test(formdata.password)) {message.errorpass= formdata.password +' Upper case, Lower case, Special character and Numeric letter are required in Password filed'}
 if (formdata.password != formdata.confirmpassword) { message.errormatch = 'Password not Matched'+ formdata.password+ '!=' +formdata.confirmpassword}
}


if(!(Object.keys(message).length === 0))
{return message }
else 
{ return message.status='Success'; }

}


module.exports = router;
