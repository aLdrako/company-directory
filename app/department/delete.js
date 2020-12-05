$(document).ready(function(){

    $(document).on('click', '.delete-department-btn', function(){

        let id = $(this).attr('data-id');
        let obj = JSON.parse($(this).attr('data-obj'));
        $('#deleteModalConfirmation .modal-body').addClass('d-none');
        
        $('#deleteModalConfirmation').on('click', '.btn-del', function(e) {
            
            if (departmentsActiveArray.indexOf(id) === -1) {

                departmentsArray.splice(departmentsArray.findIndex(el => { return el.name === obj.name && el.locationId === obj.locationId }), 1);

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
            } else {
                $('#deleteModalConfirmation .modal-body').removeClass('d-none');
            }
        });
    });
});