$(document).ready(function(){
 
    // app html
    let appHtml=`
        <div class='container'>
 
            <div class='page-header'>
                <h1 id='page-title'>Read Personnel</h1>
            </div>
 
            <!-- this is where the contents will be shown. -->
            <div id='page-content'></div>
 
        </div>`;
 
    $("#app").html(appHtml);
 
});
 
function changePageTitle(pageTitle){
 
    $('#page-title').text(pageTitle);
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