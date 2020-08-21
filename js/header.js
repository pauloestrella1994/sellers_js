$('.btn-menu').click( function(event){
    url = $(this).attr('href');
    event.preventDefault();
    $('#content').load(url);
});