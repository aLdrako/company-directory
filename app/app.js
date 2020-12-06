let locationsArray = [];
let departmentsArray = [];
let departmentsActiveArray = [];
let filterOptionsHtml = '<option value="" disabled selected>Sort</option>';
let personnelDataArray = [];

let sortAsc = 'fnA';
let sortDesc = 'fnD';

$(document).ready(function(){
 
    let appHtml = `
            <div class="container-fluid main-content px-0">
                <div id="page-content"></div>
            </div>
        `;
 
    $("#app").html(appHtml);

    $("body").tooltip({ selector: '[data-toggle=tooltip]', trigger : 'hover' });
    
});
 
function changePageTitle(pageTitle){
 
    $('.page-title').text(pageTitle);
    document.title = pageTitle;
}

// function to make form values to json format
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
