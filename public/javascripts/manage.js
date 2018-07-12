$(document).ready(function() {
    $('#example').DataTable();
    $('button').click(function(){
        $(this).toggleClass("but1");
        var a = $(this).hasClass("but1");
        console.log("jhfbvjFBvv",a);
    });
});