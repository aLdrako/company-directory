$(document).ready(function(){
 
    $(document).on('click', '.delete-personnel-btn', function(){

        let id = $(this).attr('data-id');
        
        $('#deleteModalConfirmation').on('click', '.btn-del', function(e) {
            $.ajax({
                url: "http://localhost/company-directory/api/personnel/delete.php",
                type : "POST",
                dataType : 'json',
                data : JSON.stringify({ id: id }),
                success : function(result) {

                    showPersonnel();
                    $('#deleteModalConfirmation').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    $('body').css('padding-right', 0);
                    
                },
                error: function(xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        });
    });
});