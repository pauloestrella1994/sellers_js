/* crud api */
function read_api(id){

}
function create_api(data){
    let dataJson = toJson(data);
    delete dataJson.id;
    save(JSON.stringify(dataJson));
    $('.msg.success').html('<p>Dado salvo com sucesso!</p>');
}
function update_api(data) {
    let id = data[0].value;
    let dataJson = toJson(data);
    delete dataJson.id;
    update(dataJson, id);
    $('.msg.success').html('<p>Dado editado com sucesso!</p>');
}
function delete_api(id){
    delete_data(id);
    $('.msg.success').html('<p>Dado deletado com sucesso!</p>');
}
//------------------ end crud api

function loadResource(url, selector){
    $(selector).load(url).promise().done(()=>{
        index = url.indexOf('?')
        if(index!=-1){
            id = url.substring(index+4);
            findById(id);
        }
    });
}

function btnClick(event){
    event.preventDefault();
    url = $(event.target).attr('href');
    resource = '#form';
    loadResource(url, resource);
    $('#form').show(); 
}

$('.btn-new').click( (event)=>btnClick(event) );

function btnDelete(event) {
    event.preventDefault();
    let id = $(event.target).parent().data("id");
    delete_api(id);
}

$('form').submit((event)=>{
    $('.msg.success').html('')
    $('.msg-error').html('');
    event.preventDefault();
    let message = '';
    let values = $(event.target).serializeArray();

    values.forEach(e => {

        $("[name='"+e['name']+"']").removeClass('input-error');
        if(e['value'].trim() == '' && e['name'] != 'id') {
            message += '<p>* O campo '+e['name']+' precisa ser preenchido! </p>';
            $("[name='"+e['name']+"']").addClass('input-error');
        }
    });
    $('.msg-error').html(message);
    if(message == ''){
        if (values[0].value) {
            update_api(values);
        } else {
            create_api(values);
        }
    }
});