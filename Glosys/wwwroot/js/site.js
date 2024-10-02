$(".lang").click(function () {
    $(this).toggleClass("show-dropdown");
})
$(document).click(function (event) {
    if (!$(event.target).closest('.lang').length) {
        $('.lang').removeClass('show-dropdown');
    }
});

$(".big-photo img").attr("src", $(".selected-photo img").attr("src"))
$(".mini-photos .item").click(function () {
    $(".mini-photos .item").removeClass("selected-photo")
    $(this).addClass("selected-photo")
    $(".big-photo img").attr("src", $(this).children().attr("src"))
})
$(".mini-photos .item").eq(0).addClass("selected-photo")

//FILTER
const url = window.location.href;
const urlObject = new URL(url);
const pathSegments = urlObject.pathname.split('/');
const urlId = pathSegments[pathSegments.length - 1];
$(".filter .filter-item").each(function () {
    if (urlId == $(this).attr("catId")) {
        $(".filter .filter-item").removeClass("btn-gray-active")
        $(this).addClass("btn-gray-active")
    }
})
$(".media-filter .filter-item").each(function () {
    if (urlId == $(this).attr("catId")) {
        $(".media-filter .filter-item").removeClass("btn-gray-active")
        $(this).addClass("btn-gray-active")
    }
})
//FILTER END

//PRODUCT
//REMOVE
$(".js-remove-product").click(function () {
    let product = $(this).closest(".product-card")
    let productId = product.attr("productId")
    $("body").css("overflow", "hidden");
    $("body").append(`
    <div class="modal-fon dlt-modal">
        <div class="modal">
            <img src="/img/warning-svgrepo-com 1.png" alt="">
            <h3>Delete Project</h3>
            <p>You’re going to delete this project. Are you sure?</p>
            <div class="modal-btns">
                <button class="btn btn-cancel btn-close-mdl">No</button>
                <button class="btn btn-remove-md js-dlt-product">Yes</button>
            </div>
        </div>
    </div>`)
    $(".js-dlt-product").click(function () {
        $.ajax({
            url: '/admin/deleteproduct/' + productId,
            type: 'DELETE',
            success: function () {
                product.closest(".box").remove()
                $("body").css("overflow", "unset");
                $(".modal-fon").remove()
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    })
})
//PRODUCT END

//PRODUCT CATEGORY
//ADD
$(".admin-products .btn-add-cat").click(function () {
    $("body").css("overflow", "hidden");
    $("body").append(`
    <div class="modal-fon">
        <div class="modal">
            <div class="modal-title">
                <h3>New category</h3>
                <button class="btn btn-close-mdl"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg></button>
            </div>
            <div class="input-form">
                <label for="categoryName" class="placeholder">Category name</label>
                <input class="form-item" type="text" id="categoryName"/>
            </div>
            <div class="modal-btns">
                <button class="btn btn-blue btn-big js-add-product-cat">Add<i class="fa-solid fa-plus-minus"></i></button>
            </div>
        </div>
    </div>`)
    $('.js-add-product-cat').click(function () {
        let inputValue = $('#categoryName').val();
        console.log(inputValue)
        var userData = { CategoryName: inputValue }
        $.ajax({
            url: '/admin/AddProductCategory/',
            type: 'post',
            data: JSON.stringify(userData),
            contentType: 'application/json',
            success: function (res) {
                //$('.btn-add-cat').remove()
                //$('.filter').append(`
                //    <div class="btn-gray filter-item" catId="${res.categoryId}">
                //        <a href="/admin/adminproduct/${res.categoryId}">
                //            ${res.categoryName}
                //        </a>
                //        <i class="fa-solid fa-xmark js-dlt-cat"></i>
                //    </div>
                //    <button class="btn btn-gray btn-add-cat"><i class="fa-solid fa-plus-minus"></i>Add category</button>
                //`)
                //$("body").css("overflow", "unset");
                //$(".modal-fon").remove()
                location.reload()
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    })
})
//REMOVE
$('.admin-products .js-dlt-cat').click(function () {
    let cat = $(this).closest(".filter-item")
    let catId = cat.attr("catId")
    $("body").css("overflow", "hidden");
    $("body").append(`
    <div class="modal-fon dlt-modal">
        <div class="modal">
            <img src="/img/warning-svgrepo-com 1.png" alt="">
            <h3>Delete Category</h3>
            <p>You’re going to delete this category and all products with this category. Are you sure?</p>
            <div class="modal-btns">
                <button class="btn btn-cancel btn-close-mdl">No</button>
                <button class="btn btn-remove-md mdl-dlt-product-cat">Yes</button>
            </div>
        </div>
    </div>`)
    $(".mdl-dlt-product-cat").click(function () {
        $.ajax({
            url: '/admin/DeleteProductCategory/' + catId,
            type: 'DELETE',
            success: function () {
                location.reload()
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    })
})
//PRODUCT CATEGORY END
//GALLERU CATEGORY
//ADD
$(".admin-gallery .btn-add-cat").click(function () {
    $("body").css("overflow", "hidden");
    $("body").append(`
    <div class="modal-fon">
        <div class="modal">
            <div class="modal-title">
                <h3>New category</h3>
                <button class="btn btn-close-mdl"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg></button>
            </div>
            <div class="input-form">
                <label for="categoryName" class="placeholder">Category name</label>
                <input class="form-item" type="text" id="categoryName"/>
            </div>
            <div class="modal-btns">
                <button class="btn btn-blue btn-big js-add-gallery-cat">Add<i class="fa-solid fa-plus-minus"></i></button>
            </div>
        </div>
    </div>`)
    $('.js-add-gallery-cat').click(function () {
        let inputValue = $('#categoryName').val();
        console.log(inputValue)
        var userData = { CategoryName: inputValue }
        $.ajax({
            url: '/admin/AddGalleryCategory/',
            type: 'post',
            data: JSON.stringify(userData),
            contentType: 'application/json',
            success: function (res) {
                //$('.btn-add-cat').remove()
                //$('.filter').append(`
                //    <div class="btn-gray filter-item" catId="${res.categoryId}">
                //        <a href="/admin/adminproduct/${res.categoryId}">
                //            ${res.categoryName}
                //        </a>
                //        <i class="fa-solid fa-xmark js-dlt-cat"></i>
                //    </div>
                //    <button class="btn btn-gray btn-add-cat"><i class="fa-solid fa-plus-minus"></i>Add category</button>
                //`)
                //$("body").css("overflow", "unset");
                //$(".modal-fon").remove()
                location.reload()
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    })
})
//REMOVE
$('.admin-gallery .js-dlt-cat').click(function () {
    let cat = $(this).closest(".filter-item")
    let catId = cat.attr("catId")
    $("body").css("overflow", "hidden");
    $("body").append(`
    <div class="modal-fon dlt-modal">
        <div class="modal">
            <img src="/img/warning-svgrepo-com 1.png" alt="">
            <h3>Delete Category</h3>
            <p>You’re going to delete this category and all photo with this category. Are you sure?</p>
            <div class="modal-btns">
                <button class="btn btn-cancel btn-close-mdl">No</button>
                <button class="btn btn-remove-md mdl-dlt-gallery-cat">Yes</button>
            </div>
        </div>
    </div>`)
    $(".mdl-dlt-gallery-cat").click(function () {
        $.ajax({
            url: '/admin/DeleteGalleryCategory/' + catId,
            type: 'DELETE',
            success: function () {
                location.reload()
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    })
})
//CATEGORY END

//SERVICES
//ADD
$(".btn-add-service").click(function () {
    $("body").css("overflow", "hidden");
    $("body").append(`
    <div class="modal-fon">
        <div class="modal">
            <div class="modal-title">
                <h3>New service</h3>
                <button class="btn btn-close-mdl"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg></button>
            </div>
            <div class="input-form">
                <label for="serviceName" class="placeholder">Service name</label>
                <input class="form-item" type="text" id="serviceName"/>
            </div>
            <div class="modal-btns">
                <button class="btn btn-blue btn-big js-add-service">Add<i class="fa-solid fa-plus-minus"></i></button>
            </div>
        </div>
    </div>`)
    $('.js-add-service').click(function () {
        let inputValue = $('#serviceName').val();
        var userData = { ServiceName: inputValue }
        $.ajax({
            url: '/admin/AddService/',
            type: 'post',
            data: JSON.stringify(userData),
            contentType: 'application/json',
            success: function (res) {
                $('.admin-service-list').append(`
            <div class="box">
                <div class="service-card" serviceId="${res.serviceId}">
                    <div class="card-image">
                        <img src="/img/cloud-check-icon.png" alt="">
                    </div>
                    <div class="card-text">
                        <h3>${res.serviceName}</h3>
                    </div>
                    <div class="card-btn">
                        <button class="btn btn-small btn-edit btn-edit-service">
                           <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                        </button>
                        <button class="btn btn-small btn-remove">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
                `)
                $("body").css("overflow", "unset");
                $(".modal-fon").remove()
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    })
})

//EDIT
$(".btn-edit-service").click(function () {
    let service = $(this).closest(".service-card")
    let serviceId = service.attr("serviceId")
    $.get("/admin/editservice", { id: serviceId }, function (res) {
        $("body").css("overflow", "hidden");
        $("body").append(`
    <div class="modal-fon">
        <div class="modal">
            <div class="modal-title">
                <h3>Edit service</h3>
                <button class="btn btn-close-mdl"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg></button>
            </div>
            <div class="input-form">
                <label for="serviceName" class="placeholder placeholder-active">Service name</label>
                <input class="form-item" type="text" id="serviceName" class="input-focus"  value="${res.serviceName}"/>
            </div>
            <div class="modal-btns">
                <button class="btn btn-blue btn-big js-edit-service">Add<i class="fa-solid fa-plus-minus"></i></button>
            </div>
        </div>
    </div>`)

    })
    $('.js-edit-service').click(function () {
        let inputValue = $('#serviceName').val();
        var userData = { ServiceName: inputValue }
        $.ajax({
            url: '/admin/editservice/' + serviceId,
            type: 'post',
            data: JSON.stringify(userData),
            contentType: 'application/json',
            success: function (res) {
                service.html(`
                    <div class="card-image">
                        <img src="/img/cloud-check-icon.png" alt="">
                    </div>
                    <div class="card-text">
                        <h3>${res.serviceName}</h3>
                    </div>
                    <div class="card-btn">
                        <button class="btn btn-small btn-edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                        </button>
                        <button class="btn btn-small btn-remove">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </button>
                    </div>
                `)
                $("body").css("overflow", "unset");
                $(".modal-fon").remove()
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    })
})

//REMOVE
$(".js-remove-service").click(function () {
    let service = $(this).closest(".service-card")
    let serviceId = service.attr("serviceId")
    $("body").css("overflow", "hidden");
    $("body").append(`
    <div class="modal-fon dlt-modal">
        <div class="modal">
            <img src="/img/warning-svgrepo-com 1.png" alt="">
            <h3>Delete Service</h3>
            <p>You’re going to delete this service. Are you sure?</p>
            <div class="modal-btns">
                <button class="btn btn-cancel btn-close-mdl">No</button>
                <button class="btn btn-remove-md js-dlt-service">Yes</button>
            </div>
        </div>
    </div>`)
    $(".js-dlt-service").click(function () {
        $.ajax({
            url: '/admin/deleteservice/' + serviceId,
            type: 'DELETE',
            success: function () {
                service.closest('.box').remove()
                $("body").css("overflow", "unset");
                $(".modal-fon").remove()
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    })
})
//SERVICES END
$("body").on("click", ".btn-close-mdl", function () {
    $("body").css("overflow", "unset");
    $(".modal-fon").remove()
})

$("body").on("focus", ".input-form .form-item", function () {
    $(this).siblings(".placeholder").addClass("placeholder-focus")
    $(this).siblings(".placeholder").removeClass("placeholder-active")
    $(this).removeClass('input-focus')
}).on("blur", ".input-form .form-item", function () {
    $(this).siblings(".placeholder").removeClass("placeholder-focus")
    if ($(this).val() == "") {
        $(this).siblings(".placeholder").removeClass("placeholder-active")
    } else {
        $(this).siblings(".placeholder").addClass("placeholder-active")
        $(this).addClass('input-focus')
    }
})
if ($(".input-form .form-item").val() != "") {
    $(".input-form .form-item").siblings(".placeholder").addClass("placeholder-active")
    $(".input-form .form-item").addClass('input-focus')
}
$("nav #search").focus(function () {
    let currentWidth = parseFloat($(this).css("width"));
    if ($(this).val() == "") {
        $(this).siblings("span").hide()
        $(this).css("width", `${currentWidth + 40}px`);
        $(this).css("opacity", "1")
    }
}).blur(function () {
    let currentWidth = parseFloat($(this).css("width"));
    if ($(this).val() == "") {
        $(this).siblings("span").show()
        $(this).css("width", `${currentWidth - 40}px`);
        $(this).css("opacity", "0")
    }
})
if ($('.add-photo-list').children().length === 0) {
    $('.add-photo-list').hide();
}
// Обработчик события изменения поля выбора файла
$("#projectPhoto").change(function () {
    if (this.files.length > 0) {
        $('.add-photo-list').show();
        // Получение первого файла из списка выбранных
        const file = this.files[0];
        const fileURL = URL.createObjectURL(file);

        // Создание элементов
        const addPhotoItem = document.createElement('div');
        addPhotoItem.classList.add('add-photo-item');

        const img = document.createElement('img');
        img.src = fileURL;
        img.alt = 'Photo';

        const dltPhoto = document.createElement('div');
        dltPhoto.classList.add('dlt-photo');

        const i = document.createElement('i');
        i.classList.add('fa-solid', 'fa-xmark');

        // Построение структуры
        dltPhoto.appendChild(i);
        addPhotoItem.appendChild(img);
        addPhotoItem.appendChild(dltPhoto);
        addPhotoItem.appendChild(this.cloneNode(true))

        // Добавление элемента в список
        document.querySelector('.add-photo-list').appendChild(addPhotoItem);

        // Очистка выбранного файла
        $(this).val(""); // Очищаем поле выбора файла после добавления изображения
    }
});
$("#galeryPhoto").change(function () {
    $('.add-photo-list').empty()
    if (this.files.length > 0) {
        $('.add-photo-list').show();
        // Получение первого файла из списка выбранных
        const file = this.files[0];
        const fileURL = URL.createObjectURL(file);

        // Создание элементов
        const addPhotoItem = document.createElement('div');
        addPhotoItem.classList.add('add-photo-item');

        const img = document.createElement('img');
        img.src = fileURL;
        img.alt = 'Photo';

        const dltPhoto = document.createElement('div');
        dltPhoto.classList.add('dlt-photo');

        const i = document.createElement('i');
        i.classList.add('fa-solid', 'fa-xmark');

        // Построение структуры
        dltPhoto.appendChild(i);
        addPhotoItem.appendChild(img);
        addPhotoItem.appendChild(dltPhoto);
        //addPhotoItem.appendChild(this.cloneNode(true))

        // Добавление элемента в список
        document.querySelector('.add-photo-list').appendChild(addPhotoItem);

        // Очистка выбранного файла
        $(this).val(""); // Очищаем поле выбора файла после добавления изображения
    }
});
$('.select-cat li').click(function () {
    let value = parseInt($(this).attr('catId'))
    //$("#ProductCategoryId").val(value)
    $(this).closest("label").siblings().val(value)
    $(".select-cat span").html($(this).html());
})
$(".select-cat").click(function () {
    $(this).toggleClass("show-dropdown");
})

let deletedPhoto = [];
$('body').on("click", ".old-photo", function () {
    let photoId = parseInt($(this).attr("photoId"))
    deletedPhoto.push(photoId);
    $('#deleted-photo').val(JSON.stringify(deletedPhoto))
})
$("body").on("click", ".dlt-photo", function () {
    $(this).closest(".add-photo-item").remove()
    if ($('.add-photo-list').children().length === 0) {
        $('.add-photo-list').hide();
    }
})

$(".lock").click(function () {
    if ($("#UserPassword").attr("type") == "password") {
        $("#UserPassword").attr("type", "text")
    } else {
        $("#UserPassword").attr("type", "password")
    }
})

document.addEventListener("DOMContentLoaded", function () {
    // Получаем все ссылки в меню
    const menuLinks = document.querySelectorAll('.media-menu a');

    // Получаем текущий URL страницы
    const currentPath = window.location.pathname;

    // Перебираем все ссылки
    menuLinks.forEach(link => {
        // Если href ссылки совпадает с текущим URL
        if (link.getAttribute('href') === currentPath) {
            // Добавляем класс активной ссылки
            link.classList.add('media-menu-active');
        } else if (currentPath === "/" && link.getAttribute('href') === "/home/index") {
            link.classList.add('media-menu-active');
        }
    });
});
//SHOW GALLERY PHOTO
var galleryId

$(".gallery-item").click(function () {
    $("body").css("overflow", "hidden")
    $(".gallery-modal").css("display", "flex")
    galleryId = $(this).attr("galleryId")
    $.ajax({
        url: '/home/getgalleryphoto/' + galleryId,
        type: 'get',
        success: function (res) {
            $(".gallery-modal img").attr("src", `/img/galleryPhoto/${res.galeryPhotoName}`);
            galleryId = res.galeryPhotoId;
            console.log(res.galeryPhotoId)
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
})
$(".close-modal").click(function () {
    $("body").css("overflow", "unset")
    $(".gallery-modal img").attr("src", "");
    $(".gallery-modal").css("display", "none")
})
$(".modal-prev").click(function () {
    $.ajax({
        url: '/home/GetPrevPhoto/' + galleryId,
        type: 'get',
        success: function (res) {
            $(".gallery-modal img").attr("src", `/img/galleryPhoto/${res.galeryPhotoName}`);
            galleryId = res.galeryPhotoId
            console.log(res.galeryPhotoId)
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});
$(".modal-next").click(function () {
    $.ajax({
        url: '/home/GetNextPhoto/' + galleryId,
        type: 'get',
        success: function (res) {
            $(".gallery-modal img").attr("src", `/img/galleryPhoto/${res.galeryPhotoName}`);
            galleryId = res.galeryPhotoId
            console.log(res.galeryPhotoId)
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});
var swiper = new Swiper(".home-products .mySwiper", {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: ".home-products .swiper-button-next",
        prevEl: ".home-products .swiper-button-prev",
    },
});
var swiper = new Swiper(".home-services .mySwiper", {
    slidesPerView: 4,
    spaceBetween: 60,
    navigation: {
        nextEl: ".home-services .swiper-button-next",
        prevEl: ".home-services .swiper-button-prev",
    },
});
var slidesToShow = $(window).width() <= 768 ? 2 : 6;
var swiper = new Swiper(".home-partners .mySwiper", {
    slidesPerView: slidesToShow,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});
var swiper = new Swiper("header .mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    on: {
        slideChangeTransitionEnd: function () {
            var slideId = parseInt($(".swiper-slide-active").attr("data-swiper-slide-index")) + 1;
            $('.slide-index').html(`0${slideId}`);
        },
    },
});