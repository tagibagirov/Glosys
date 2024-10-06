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
            <p>You’re going to delete this product. Are you sure?</p>
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
$(".js-remove-project").click(function () {
    let project = $(this).closest(".product-card")
    let projectId = project.attr("projectId")
    $("body").css("overflow", "hidden");
    $("body").append(`
    <div class="modal-fon dlt-modal">
        <div class="modal">
            <img src="/img/warning-svgrepo-com 1.png" alt="">
            <h3>Delete Project</h3>
            <p>You’re going to delete this project. Are you sure?</p>
            <div class="modal-btns">
                <button class="btn btn-cancel btn-close-mdl">No</button>
                <button class="btn btn-remove-md js-dlt-project">Yes</button>
            </div>
        </div>
    </div>`)
    $(".js-dlt-project").click(function () {
        $.ajax({
            url: '/admin/deleteproject/' + projectId,
            type: 'DELETE',
            success: function () {
                project.closest(".box").remove()
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
$("#productPhoto").change(function () {
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
    console.log(galleryId)
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
var swiperHome = new Swiper(".home-partners .mySwiper", {
    slidesPerView: slidesToShow,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

//var swiperBank = new Swiper(".mySwiperBank", {
//    slidesPerView: slidesToShow,
//    loop: true,
//    autoplay: {
//        delay: 2500,
//        disableOnInteraction: false,
//    },
//    direction: 'horizontal',
//});
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

const aboutTitleArray = [
    {
        titleId: 1,
        titleName: 'Data Center Solutions'
    },
    {
        titleId: 2,
        titleName: 'Network Infrastructure Solutions'
    },
    {
        titleId: 3,
        titleName: 'Business Continuity Solutions'
    },
    {
        titleId: 4,
        titleName: 'Data Center Cooling'
    },
    {
        titleId: 5,
        titleName: 'Unified Communication Solutions'
    },
    {
        titleId: 6,
        titleName: 'Video Surveillance System'
    },
    {
        titleId: 7,
        titleName: 'Structured Cabling Solutions'
    },

]
const aboutArray = [
    {
        categoryId: 1,
        mainContent: `
        <div class= "about-item" >
            <h3>Data Center Infrastructure Products</h3>
            <p>With ever-increasing data center (DC) size and complexity, DC managers and IT professionals require the right configurations and equipment to meet their specific environment needs, as well as remote management solutions that enable them to quickly and effectively access servers, network devices, and other mission-critical equipment.</p>
            <p>These products are not only vital to run the system efficiently, but can also contribute to an overall strategy that saves your company money. With a vendor independent approach, the experts at GloSys can review your specific environment and help you find the best infrastructure solutions for your data center, server room, computer closet, or server rack.</p>
        </div >
        <div class= "about-item" >
            <h3>Airflow Management</h3>
            <p>Optimize power and cost efficiency.</p>
        </div >
        <div class= "about-item" >
            <h3>Cooling</h3>
            <p>More on Inrow Precision Cooling, High Density Cooling, & Integrated Cooling.</p>
        </div >
        <div class= "about-item" >
            <h3>Data Center Containment</h3>
            <p>Hot Aisle, Cold Aisle, Chimney, Curtain, Modular, and the in-between pieces that make it work.</p>
        </div >
        <div class= "about-item" >
            <h3>Power Distribution</h3>
            <p>Power Distribution Units and Uninterruptible Power Supply.</p>
        </div >
        <div class= "about-item" >
            <h3>Racks & Enclosures</h3>
            <p>Standard Racks, Network Racks, Chimney Racks, Industrial Racks, etc.</p>
        </div >
        <div class= "about-item" >
            <h3>Security</h3>
            <p>Two main defense solution types include physical security and network security.</p>
        </div >
        `
    }, {
        categoryId: 2,
        mainContent: `
        <div class= "about-item" >
            <h3>Reliable, Secure Network Foundations</h3>
            <p>Implement a solution that can evolve with your business.</p>
            <p>With a focus on security and quality of service, our cross-certified engineers design, implement, and support various network and infrastructure solutions.</p>
            <p>Our services and solutions encompass all aspects of critical back-end IT environments.</p>
        </div >
        <div class= "about-item" >
            <h2>What You Get</h3>
        </div >
        <div class= "about-item" >
            <h3>Design & Development</h3>
            <p>Get a strategic solution designed to address not only your current requirements, but your also future needs.</p>
        </div >
        <div class= "about-item" >
            <h3>Deployment</h3>
            <p>Define your timeline, and our IT experts will ensure every detail launches on time.</p>
        </div >
        <div class= "about-item" >
            <h3>Support</h3>
            <p>Benefit from ongoing support and training from our network engineers, onsite or on the phone.</p>
        </div >
        <div class= "about-item" >
            <h2>Our team provides:</h3>
        </div >
        <div class= "about-item" >
            <p>LAN/WAN design, installation, and configuration</p>
            <p>Enterprise and SMB wireless network design</p>
            <p>VoIP solutions</p>
            <p>Load balancing solutions</p>
            <p>Bandwidth management</p>
            <p>Remote data center management</p>
            <p>Caching and proxy solutions</p>
            <p>Consolidation services</p>
            <p>Remote access solutions</p>
            <p>Network audits and baselining</p>
            <p>Business continuity and disaster recovery planning</p>
        </div >
        <div class= "about-item" >
            <p>Drawing on our strong network of trusted partners, we combine the most reliable technologies and services for your one-of-a-kind solution.</p>
        </div >
        `
    }, {
        categoryId: 3,
        mainContent: `
        <div class= "about-item">
            <p>Unanticipated business interruptions, whether caused by man-made threats or natural disasters, can devastate an organization. Safeguarding your business and its reputation by providing for the continuity of operations must become a top priority.</p>
        </div>
        <div class= "about-item">
            <p>GloSys’s Business Continuity Solutions help identify, assess and develop your organization’s policies and procedures for addressing operational risk. With our proven methodology, clients are assured proper contingency planning to reduce the likelihood and impact of disruptive events.</p>
        </div>
        <div class= "about-item">
            <p>Our comprehensive Business Continuity offerings assist in hardening your critical business functions and supporting applications and data. We analyze, recommend and assist with the implementation of reliable strategies and solutions to satisfy operational requirements and accommodate growing business needs. </p>
        </div>
        <div class= "about-item">
            <h3>Offerings include: </h3>
            <ul>
                <li>Business continuity management maturity assessments to help organizations understand the current maturity level of business continuity plans and how to achieve the desired future state<li/>
                <li>Business continuity program management<li/>
                <li>Contingency strategy and emergency and/or disaster response solutions<li/>
                <li>Continuity of operations planning and critical infrastructure protection planning<li/>
                <li>Risk assessment and business impact analysis<li/>
                <li>Crisis management and communications response planning<li/>
            </ul>
        </div>
        `
    }, {
        categoryId: 4,
        mainContent: `
        <div class= "about-item" >
            <h3>Data Center Cooling Solutions</h3>
        </div >
        <div class= "about-item" >
            <p>Cooling solutions for IT equipment, from small network closets to enterprise data centers, today’s smaller server room environments are dealing with the growing needs for server rack densities. At one point in time, building HVAC systems were sufficient enough to handle the cooling requirements of these smaller computer rooms.</p>
        </div >
        <div class= "about-item" >
            <p>Portable cooling units may work in some server rooms, while others may be too space restricted. In some cases an engineered computer room cooling system may be a more efficient, economical choices in the long run; while precision, in-rack cooling may be the best option in others. Not anymore. Server room cooling has become a much higher priority for today’s IT professionals. What’s for sure is that open doors with box fans pushing office air isn’t going to cut it anymore.</p>
        </div >
        <div class= "about-item" >
            <h3>Inrow Precision Cooling</h3>
        </div >
        <div class= "about-item" >
            <p>Conventional data center cooling floods an entire room with cold air-an approach that works well at minimal power densities. In-Row cooling offers capacity and efficiency gains by moving the air conditioner from the perimeter of the room closer to actual load. Installed on the floor or suspended from overhead, in-row cooling units provide local, focused cooling at the rows of server cabinets which fill the data center.</p>
            <p>High Density, High Efficiency</p>
            <p>Distance is the cornerstone of inrow performance. Neither cool air nor warm exhaust air has far to travel, allowing the unity to dissipate high heat loads.</p>
            <p>Flexible Cooling Medium</p>
            <p>Inrow solutions, whether floor mounted or overhead, consist of fans and a cooling coil. Depending on the product, the cooling coil will utilize chilled water or refrigerants as the cooling medium.</p>
            <p>Refrigerant based units will require connection to a remote condenser system while chilled water based units traditionally connect to chiller systems.</p>
        </div >
        <div class= "about-item" >
            <p>Benefits</p>
            <p>✓ Adapts to all major manufacturers racks and rack containment systems</p>
            <p>✓ Installation on raised / non-raised floors</p>
            <p>✓ Suitable for new and existing data centers; easy to add units as you grow</p>
            <p>✓ Used in containment, open architecture and hot spot reduction applications</p>
            <p>✓ Top or bottom pipe and power connections</p>
            <p>✓ 100% serviceable through front and rear access</p>
            <p>✓ DX with Free Cooling (FC) Coil options</p>
            <p>✓ Various fan control options allowing optimized air distribution</p>
        </div >
        <div class= "about-item" >
            <h3>High Density Cooling</h3>
            <p>High density closed-loop provides an inrow cooling approach to the server rack heat by integrating within a row of data center racks, therefore providing the most efficient cooling of your IT equipment. This type of cooling is best suited for racks typically 10-30kW or higher (up to 60kW) and small to medium sized data centers with dense loads. As well as high density POD rows in larger data centers requiring high density cooling.</p>
            <p>Hot air is drawn from the rear of the servers into the side of the Side Cooling Unit by high-efficiency fans. Cooling the air via an air-to-water heat exchanger, the unit then blasts cold air back to the front of the servers where operating temperatures are reduced and the cycle continues. The capacity of each unit is scalable from 10 to 30kW simply by adding more fans — 10kW equals one fan with 30kW achieved with three fans. An added benefit is energy savings are increased as well.</p>
            <p>Servers are cooled independently from ambient air within the data center so cooling can be adapted to the needs of individual servers or enclosures in a modular fashion. Adapting cooling capacity to a unit’s precise requirements provides for more efficient cooling and energy use.</p>
            <p>The increased capacity is available within the same footprint as existing models — you can get 30kW cooling from a unit that’s still just 12-inches wide.</p>
        </div >
        <div class= "about-item" >
            <p>Benefits</p>
            <p>✓ Self-adapts to changing conditions</p>
            <p>✓ Easily installed and accessible</p>
            <p>✓ Scalable to your current and future cooling needs</p>
            <p>✓ Higher energy efficiency when compared to perimeter cooling systems</p>
            <p>✓ Up to 30kW using water as warm as 59ºF water</p>
        </div >
        <div class= "about-item" >
            <h3>Integrated Cooling</h3>
            <p>An integrated cooling system features the cooling unit inside the base of the rack. It is the most precise cooling available, as the rack and the air conditioner operate in a closed relationship with one another. Cold air has no choice but to pass through the servers and the hot air has no choice but to pass through the heat exchanger. Integrated cooling provides a computing environment that is thermally neutral to the rest of the room. These integrated solutions typically can only cool up to 3kW and are designed for small IT rooms and network rooms.</p>
        </div >
        <div class= "about-item" >
            <p>Benefits</p>
            <p>✓ Flexibility with setup and installation</p>
            <p>✓ Higher availability and less downtime from overheating</p>
            <p>✓ Higher energy efficiency when compared to perimeter cooling systems</p>
        </div >
        <div class= "about-item" >
            <p>GloSYS is proud to offer Data Center Cooling Solutions from these top vendors:</p>
            <ul>
                <li>APC</li>
                <li>Liebert</li>
                <li>Oceanaire Portable Air Conditioner Units</li>
                <li>Rittal</li>
                <li>Stulz</li>
                <li>Tripp Lite</li>
            </ul>
        </div >
        `
    }, {
        categoryId: 5,
        mainContent: `
        <div class= "about-item" >
            <h3>Unified Communications</h3>
            <p>Enterprises of all sizes need Unified Communications technology and solutions that improve employee efficiency and effectiveness, workforce mobility, customer service—and ultimately competitiveness. Unified Communications help simplify the proliferation of everyday technologies—audio conferencing, web conferencing, video conferencing, unified messaging, instant messaging, presence, and more. Integrate voice, video, and data, enabling users to communicate and enjoy collaboration in real time, in the mode best suited to each interaction. This eliminates inefficiencies in communications to make small, midsize, or enterprise businesses more productive and responsive. It helps to improve decision making and accelerate business processes, while providing opportunities to reduce communications and operating expense. Embedding communications into business applications and processes (sometimes known as Communication Enabled Business Processes) can create competitive advantage by increasing the responsiveness of the enterprise and removing latency from business processes. Explore the full Unified Communications portfolio from Avaya, Cisco, 3CX, Polycom, Alcatel Lucent.</p>
        </div >
        <div class= "about-item" >
            <h3>GloSys services:</h3>
            <ul>
                <li>VoIP telephony,</li>
                <li>Instant messaging,</li>
                <li>Video conferencing,</li>
                <li>Mobility,</li>
                <li>Presence,</li>
                <li>Collaboration capabilities into your business environment.</li>
            </ul>
        </div >
        <div class= "about-item" >
            <h3>GloSYS is proud to offer Unified Communication Solutions from these top vendors:</h3>
            <p>Avaya, cisco, 3cx, Polycom, Alcatel Lucent</p>
        </div >
        `
    }, {
        categoryId: 6,
        mainContent: `
        <div class= "about-item" >
            <h3>Video Surveillance</h3>
            <p>Video surveillance or CCTV (closed circuit television) comfortably accounts for the biggest segment of the security technology market. </p>
            <p>Surveillance cameras capture and transmit images back to a control room – or even remotely to a smartphone – where they are recorded onto an NVR, DVR or – increasingly – to the cloud. IP or network cameras are increasingly widespread but analogue cameras remain popular. There are bullet cameras and dome cameras, as well as thermal cameras or lowlight cameras. </p>
            <p>Resolutions have soared in recent years, with HD, 4K and even 7K cameras emerging. It’s also becoming possible to cover wider areas with fewer cameras thanks to sophisticated PTZ cameras and innovations like fisheye lenses and 360-degree cameras.</p>
            <p>Video surveillance cameras are increasingly harnessed for applications beyond crime detection, including traffic monitoring, crowd control and finding operational efficiencies in retail. </p>
        </div >
        <div class= "about-item" >
            <h3>GloSYS is proud to offer Video Surveillance System Solutions from these top vendors:</h3>
            <p>Axis Communications, IDIS Europe, Panasonic Business, Avigilon, Hikvision, Bosch Security Systems, Dahua Technology, Honeywell Security Systems. </p>
        </div >
        `
    }, {
        categoryId: 7,
        mainContent: `
        <div class= "about-item" >
            <h3>Cable Standards in the Data Center</h3>
            <p>With data throughput demands constantly increasing, and loss budgets continually dropping, it's important to understand the standards when designing data center cabling infrastructures.</p>
            <p>Equally important is an understanding of the standards bodies themselves. In today’s world, these are the prominent organizations governing data center design strategies: </p>
            <p>Telecommuications Industry Association (TIA) with its TIA-942 standard</p>
            <p>The Institute of Electrical and Electronics Engineers (IEEE) with its standard regulating 40/100gb Ethernet in the 802.3ba</p>
            <p>The Building Industry Consulting Service International (BICSI) with its very current and in-depth standards for design and cabling best practices</p>
        </div >
        <div class= "about-item" >
            <h3>Cable Standards Organizations for Data Center Cabling</h3>
            <p>Telecommuications Industry Association (TIA)</p>
            <p>TIA stands for Telecommunications Industry Association. The TIA is accredited by the American National Standards Institute (ANSI). The TIA’s role is very important to professionals in the cabling industry because its standards allow guidance and inter-operability for many organizations.</p>
            <p>The TIA standards cover telecom, broadband, mobile wireless, information technology, networks, cable, satellite, unified communications, emergency communications and the greening of technology.</p>
            <p>The TIA’s roots can be traced back to 1924 when telephone manufacturers organized a trade show. The group has gone through several transformations with the drastic changes in technology that we have seen in the past several decades.</p>
            <p>Learn more about the TIA standards at their website here.</p>
        </div >
        <div class= "about-item" >
            <h3>Institute of Electrical and Electronics Engineers (IEEE)</h3>
            <p>IEEE stands for Institute of Electrical and Electronics Engineers. The IEEE plays a major role in advancing technologies. As you can imagine, this encompasses a very wide range of technologies and topics. Cabling and media types are the base platform of many of these technologies, much like the recent IEEE 802.3ba standard for 40/100 gigabit Ethernet.</p>
            <p>The IEEE started in 1884 when electricity was in its early stages of use, mainly with the advent of the telegraph. As you are well aware, electricity and electrical components are fully ingrained in almost every aspect of modern day living. </p>
            <p>Learn more about the IEEE standards at their website here.</p>
        </div >
        <div class= "about-item" >
            <h3>Building Industry Consulting Service International (BICSI)</h3>
            <p>BICSI stands for Building Industry Consulting Service International. BICSI provides information, education and knowledge for individuals and companies in the ITS (Information Technology Systems) industry.</p>
            <p>BICSI has grown considerably in strength and clout in the industry, largely based on accessible trade shows and training opportunities.  </p>
            <p>Learn more about the BICSI standards at their website here.</p>
        </div >
        <div class= "about-item" >
            <h3>WE SPECIALIZE IN:</h3>
            <p>Copper Cable Installations</p>
            <p>Fiber Optic Cable Installations</p>
            <p>Coaxial Cable Installations</p>
            <p>CCTV Security Cameras</p>
            <p>Wireless Infrastructure</p>
            <p>Access Control</p>
            <p>Backbone Distribution Systems</p>
            <p>DAS ( Distributed Antenna System )</p>
            <p>Small Cell Antenna System</p>
            <p>CATV ( Cable TV Infrastructure)</p>
            <p>Data Center Build-Outs</p>
            <p>Relay Rack & Server Cabinet Installations</p>
            <p>Cable Trays & Ladder Racks.</p>
            <p>Directional Bore and Trenching.</p>
            <p>Outside Plant Cable long haul Fiber  infrastructure.</p>
        </div >
        `
    },
]

aboutTitleArray.map((item, index) => {
    $(".about-page .filter").append(`
        <div class="btn-gray filter-item" catId="${item.titleId}">
            <span>
                ${item.titleName}
            </span>
        </div>`);
    $(".about-page .media-filter").append(`
        <div class="btn-gray filter-item" catId="${item.titleId}">
            <span>
                ${item.titleName}
            </span>
        </div>`);
});
$(".about-page .filter-item").click(function () {
    $(".about-page .filter-item").removeClass('btn-gray-active')
    $(this).addClass('btn-gray-active')
    var id = $(this).attr('catId')
    var titleTxt = aboutTitleArray.find(x => x.titleId == id).titleName;
    var context = aboutArray.find(x => x.categoryId == id).mainContent;
    $(".about-page .bottom").html(context)
    $(".about-page .title h2").html(titleTxt)
})
