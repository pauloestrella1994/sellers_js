function load_html(url, selector){
    $(selector).load(url);
}
function load_header(){
    url = '_utils/header.html';
    selector = 'header';
    load_html(url, selector);
}
$(document).ready(function(){
    load_header();
});