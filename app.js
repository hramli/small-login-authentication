//cache DOM
//jQuery
const $form = $('form');
const $button = $('#submit');
const $text = $('#input-text');
const $code_h1 = $('#code');
const $error_div = $('#error');
const $error_p = $('#error-message');
const $success_div = $('#success');
const $success_p = $('#success-message');
const $success_img = $('#success-img');
const $fail_img = $('#fail-img');
//JavaScript
const maxErrorCounts = 3;
var errorCount = 0;

//5 digit random string generator
function codeGenerator(){
  var possibleAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  var code = "";
  for(let i = 0; i<6; i++)
    code += possibleAlphabets[parseInt(Math.random()*possibleAlphabets.length)];
  return code;
};

$error_div.hide();
$success_div.hide();
$success_img.hide();
$fail_img.hide();

var code = codeGenerator();
$code_h1.text(code);

$button.on('click', () => {
  if(errorCount === 3)
  {
    $form.hide();
    $code_h1.hide();
    $fail_img.show();
    $error_p.text("Failed to authenticate.");
    $error_div.fadeIn().delay(1000).fadeOut();
  }
  else
  {
    if($text.val() === code)
    {
      $form.hide();
      $code_h1.hide();
      $success_img.show();
      $success_div.fadeIn().delay(1000).fadeOut();
    }
    else
    {
      errorCount++;
      var countsLeft = maxErrorCounts - errorCount;
      $error_p.text("Authentication failed. "+countsLeft+" try(s) left");
      $error_div.fadeIn().delay(500).fadeOut();
      code = codeGenerator();
      $code_h1.text(code);
    }
  }

});
