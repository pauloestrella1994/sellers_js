var sellers_api = 'http://127.0.0.1:5000/api/sellers/'

function load_data_json(){
    $.ajax({
        url : sellers_api
        ,dataType : 'json'
        ,type : 'get'
        ,success: (data)=>{
            load_data(data);
        },
        error: (e) =>{
            $('.msg.error.error.api').html('<h4> Erro ao acessar a api</h4>')
        }
    });
}
// ============ END Load data Json File

function update(data, id) {
    $.ajax({
        type : 'PUT',
        url: sellers_api+id,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: () => {
            load_data_json();
        },
        error: (e) => {
            $('.msg.error.error.api').html('<h4>Erro ao acessar a api</h4>')
        }
    });
}

function toJson(data) {
    let obj = {};
    obj['brand'] = data[0].value;
    obj['business_type'] = data[1].value;
    obj['cnpj'] = data[2].value;
    obj['company_name'] = data[3].value;
    obj['mobile_phone'] = data[4].value;
    return obj
}
// ============ Load Json result in HTML

function load_data(data){
    data.forEach(e => {
        data += `<tr>
            <td>${e['brand']}</td>
            <td>${e['business_type']}</td>"
            <td>${e['cnpj']}</td>"
            <td>${e['company_name']}</td>"
            <td>${e['mobile_phone']}</td>"
            <td data-id="${e['id']}">
                <a class='btn-edit' href='sellers/form.html?id=${e['id']}'>Editar</a> |
                <a class='btn-delete' href='#'>Deletar</a>
            </td>
        </tr>`;
    });

        $('table tbody').html(data).promise().done(()=>{
            $('.btn-edit').click( (event)=>btnClick(event) );
            $('.btn-delete').click( (event)=>btnDelete(event) );
        });
}
// ============ END Load Json result in HTML


function delete_data(id){
    $.ajax({
        url : sellers_api + id
        , type: 'DELETE'
        , success: (data)=> {
            load_data_json();
        },
        error: (e)=> {
            $('.msg.error.error.api').html('<h4>Erro ao acessar a api</h4>')            
        }
    })
}

// ============ Find id in Json File and Load html
function findById(id){
    $.ajax({
        url : sellers_api+id
        ,dataType : 'json'
        ,type : 'get'
        ,success: (data)=>{
            $("[name='id']").val(data.id);
            $("[name='brand']").val(data.brand);
            $("[name='business_type']").val(data.business_type);
            $("[name='cnpj']").val(data.cnpj);
            $("[name='company_name']").val(data.company_name);
            $("[name='mobile_phone']").val(data.mobile_phone);
        }
    });
}

// ============ END Find id in Json File and Load html

function save(data) {
    $.ajax({
        type : 'POST',
        url: sellers_api,
        contentType: 'application/json',
        data: data,
        success: () => {
            load_data_json();
        },
        error: (e) => {
            $('.msg.error.error.api').html('<h4>Erro ao acessar a api</h4>')
        }
    });
}

$(document).ready(()=>load_data_json());