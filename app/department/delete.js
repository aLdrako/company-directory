$(document).ready(function(){
 
    $(document).on('click', '.delete-department-btn', function(){

        let id = $(this).attr('data-id');
        let depName = $(this).attr('data-name');
        
        $('#deleteModalConfirmation').on('click', '.btn-del', function(e) {

            departments.splice(departments.indexOf(depName), 1);

            $.ajax({
                url: "http://localhost/company-directory/api/department/delete.php",
                type : "POST",
                dataType : 'json',
                data : JSON.stringify({ id: id }),
                success : function(result) {

                    showDepartment();
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