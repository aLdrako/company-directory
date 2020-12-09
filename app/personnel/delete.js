$(document).ready(function() {

    $(document).on('click', '.delete-personnel-btn', function(){

        let id = $(this).attr('data-id');
        let depId = $(this).attr('data-depId');

        $('#personModal .modal-footer').removeClass('d-none');

        $('.btn-cancel').on('click', function() {
            $('#personModal .modal-footer').addClass('d-none');
        });
        
        $('#deleteModalConfirmation, #personModal').on('click', '.btn-del', function(e) {

            departmentsActiveArray.splice(departmentsActiveArray.indexOf(depId), 1);

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
                    $('#personModal .modal-footer').addClass('d-none');
                    
                },
                error: function(xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        });
    });

    $(document).on('hide.bs.modal', '#personModal, #deleteModalConfirmation', function (e) {
        $('#personModal .modal-footer').addClass('d-none');
    });
});