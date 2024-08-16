var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 10,
});
var swiper = new Swiper(".home-services .mySwiper", {
    spaceBetween: 0,
});
var swiper = new Swiper(".home-partners .mySwiper", {
    // centeredSlides: true,
    slidesPerView: 6,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

$(".lang").click(function () {
    $(this).toggleClass("show-dropdown");
})

$(".big-photo img").attr("src", $(".selected-photo img").attr("src"))
$(".mini-photos .item").click(function () {
    $(".mini-photos .item").removeClass("selected-photo")
    $(this).addClass("selected-photo")
    $(".big-photo img").attr("src", $(this).children().attr("src"))
})


//FILTER
$(".products .filter-item").click(function () {
    var CatId = $(this).attr("catId")
    $(".products .filter-item").removeClass("btn-gray-active")
    $(this).addClass("btn-gray-active")
    $.get('/Home/Filter', { catId: CatId }, function (res) {
        $('.products .box').remove()
        $(res).each(function () {
            $(".product-lists").append(`<div class="box">
                    <div class="product-card" productId="${this.productId}">
                        <div class="card-image">
                            <img src="/img/productsPhoto/product-img.png" alt="Product Image">
                        </div>
                        <div class="card-text">
                            <h3>${this.productName}</h3>
                            <p>${this.productInfo}</p>
                        </div>
                        <div class="card-btn">
                            <a class="btn btn-medium btn-blue" href="/home/productInfo/${this.productId}">Learn more</a>
                        </div>
                    </div>
                </div>
            `)
            $(".admin-product-lists").append(`<div class="box">
                    <div class="product-card" productId="${this.productId}">
                        <div class="card-image">
                            <img src="/img/productsPhoto/product-img.png" alt="Product Image">
                        </div>
                        <div class="card-text">
                            <h3>${this.productName}</h3>
                            <p>${this.productInfo}</p>
                        </div>
                        <div class="card-btn">
                            <a class="btn btn-medium btn-blue" href="/home/productInfo/${this.productId}">Learn more</a>
                            <button class="btn btn-small btn-edit">
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M5.65344 1.58334C3.68168 1.58334 2.08325 3.18177 2.08325 5.15353V13.8465C2.08325 15.8182 3.68168 17.4167 5.65344 17.4167H9.88118C10.2526 17.4167 10.5537 17.1156 10.5537 16.7442C10.5537 16.3727 10.2526 16.0716 9.88118 16.0716H5.65344C4.42454 16.0716 3.42833 15.0754 3.42833 13.8465V5.15353C3.42833 3.92463 4.42454 2.92842 5.65344 2.92842H14.1089C15.3378 2.92842 16.334 3.92463 16.334 5.15353V9.50001C16.334 9.87146 16.6351 10.1725 17.0066 10.1725C17.378 10.1725 17.6791 9.87146 17.6791 9.50001V5.15353C17.6791 3.18177 16.0806 1.58334 14.1089 1.58334H5.65344ZM6.04362 8.82733C5.67219 8.82733 5.37108 9.1284 5.37108 9.49985C5.37108 9.8713 5.67219 10.1724 6.04362 10.1724H8.41795C8.7894 10.1724 9.09047 9.8713 9.09047 9.49985C9.09047 9.1284 8.7894 8.82733 8.41795 8.82733H6.04362ZM5.37108 6.33493C5.37108 5.9635 5.67219 5.66239 6.04362 5.66239H10.791C11.1624 5.66239 11.4635 5.9635 11.4635 6.33493C11.4635 6.70637 11.1624 7.00747 10.791 7.00747H6.04362C5.67219 7.00747 5.37108 6.70637 5.37108 6.33493ZM15.8841 10.5222C15.4668 10.098 14.7902 10.098 14.3729 10.5222L11.3991 13.5455C11.17 13.7785 11.0573 14.1045 11.0925 14.4319L11.2626 16.0116C11.3069 16.4229 11.6263 16.7476 12.0308 16.7926L13.5847 16.9655C13.9067 17.0014 14.2274 16.8867 14.4565 16.6538L17.4303 13.6305C17.8475 13.2062 17.8475 12.5184 17.4303 12.0941L15.8841 10.5222ZM12.4324 14.413L15.1285 11.6719L16.2994 12.8623L13.6033 15.6034L12.5479 15.486L12.4324 14.413Z"
                                          fill="#01BF91" />
                                </svg>
                            </button>
                            <button class="btn btn-small btn-remove js-remove-product">
                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.91675 8.70834V13.4583" stroke="#EA004A" stroke-width="1.5"
                                          stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.0833 8.70834V13.4583" stroke="#EA004A" stroke-width="1.5"
                                          stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.16675 5.54166H15.8334" stroke="#EA004A" stroke-width="1.5"
                                          stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4.75 5.54166H9.5H14.25V14.25C14.25 15.5617 13.1867 16.625 11.875 16.625H7.125C5.81333 16.625 4.75 15.5617 4.75 14.25V5.54166Z"
                                          stroke="#EA004A" stroke-width="1.5" stroke-linecap="round"
                                          stroke-linejoin="round" />
                                    <path d="M7.125 3.95833C7.125 3.08388 7.83388 2.375 8.70833 2.375H10.2917C11.1661 2.375 11.875 3.08388 11.875 3.95833V5.54167H7.125V3.95833Z"
                                          stroke="#EA004A" stroke-width="1.5" stroke-linecap="round"
                                          stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `)
        })
    })
})
//FILTER END

//PRODUCT
//ADD
$(".add-product").click(function () {
    $("body").append(`
    <div class="modal-fon">
        <div class="modal">
            <div class="modal-title">
                <h3>New project</h3>
                <button class="btn btn-close-mdl"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg></button>
            </div>
            <div class="input-form">
                <label for="">Project name</label>
                <input type="text" placeholder="Project name">
            </div>
            <div class="input-form">
                <label for="">Description</label>
                <input type="text" placeholder="Description">
            </div>
            <div class="input-form">
                <label>Category</label>
                <section></section>
            </div>
            <div class="modal-btns">
                <button class="btn btn-blue btn-big">Add<i class="fa-solid fa-plus-minus"></i></button>
            </div>
        </div>
    </div>`)
})

//REMOVE
$(".js-remove-product").click(function () {
    let product = $(this).closest(".product-card")
    let productId = product.attr("productId")
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
            dataType: 'json',
            success: function () {
                product.remove()
                $(".modal-fon").remove()
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    })
})
//PRODUCT END

//CATEGORY
//ADD
$(".btn-add-cat").click(function () {
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
                <label for="">Category name</label>
                <input type="text" id="categoryName" placeholder="Category name">
            </div>
            <div class="modal-btns">
                <button class="btn btn-blue btn-big js-add-cat">Add<i class="fa-solid fa-plus-minus"></i></button>
            </div>
        </div>
    </div>`)
    $('.js-add-cat').click(function () {
        let inputValue = $('#categoryName').val();
        console.log(inputValue)
        var userData = { CategoryName: inputValue }
        $.ajax({
            url: '/admin/AddCategory/',
            type: 'post',
            data: JSON.stringify(userData),
            contentType: 'application/json',
            success: function (res) {
                $('.category-box').append(`
                    <button catId="${res.categoryId}" class="btn-gray filter-item">${res.categoryName}</button>
                `)
                $(".modal-fon").remove()
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    })
})
//REMOVE
$('.js-remove-cat').click(function () {
    let cat = $(this).closest(".filter-item")
    let catId = cat.attr("catId")
    $("body").append(`
    <div class="modal-fon dlt-modal">
        <div class="modal">
            <img src="/img/warning-svgrepo-com 1.png" alt="">
            <h3>Delete Category</h3>
            <p>You’re going to delete this category. Are you sure?</p>
            <div class="modal-btns">
                <button class="btn btn-cancel btn-close-mdl">No</button>
                <button class="btn btn-remove-md js-dlt-cat">Yes</button>
            </div>
        </div>
    </div>`)
    $(".js-dlt-cat").click(function () {
        $.ajax({
            url: '/admin/deleteCategory/' + catId,
            type: 'DELETE',
            dataType: 'json',
            success: function () {
                cat.remove()
                $(".modal-fon").remove()
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
                <label for="serviceName">Service name</label>
                <input type="text" id="serviceName" placeholder="Service name">
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
                            <svg width="20" height="19" viewBox="0 0 20 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M5.65344 1.58334C3.68168 1.58334 2.08325 3.18177 2.08325 5.15353V13.8465C2.08325 15.8182 3.68168 17.4167 5.65344 17.4167H9.88118C10.2526 17.4167 10.5537 17.1156 10.5537 16.7442C10.5537 16.3727 10.2526 16.0716 9.88118 16.0716H5.65344C4.42454 16.0716 3.42833 15.0754 3.42833 13.8465V5.15353C3.42833 3.92463 4.42454 2.92842 5.65344 2.92842H14.1089C15.3378 2.92842 16.334 3.92463 16.334 5.15353V9.50001C16.334 9.87146 16.6351 10.1725 17.0066 10.1725C17.378 10.1725 17.6791 9.87146 17.6791 9.50001V5.15353C17.6791 3.18177 16.0806 1.58334 14.1089 1.58334H5.65344ZM6.04362 8.82733C5.67219 8.82733 5.37108 9.1284 5.37108 9.49985C5.37108 9.8713 5.67219 10.1724 6.04362 10.1724H8.41795C8.7894 10.1724 9.09047 9.8713 9.09047 9.49985C9.09047 9.1284 8.7894 8.82733 8.41795 8.82733H6.04362ZM5.37108 6.33493C5.37108 5.9635 5.67219 5.66239 6.04362 5.66239H10.791C11.1624 5.66239 11.4635 5.9635 11.4635 6.33493C11.4635 6.70637 11.1624 7.00747 10.791 7.00747H6.04362C5.67219 7.00747 5.37108 6.70637 5.37108 6.33493ZM15.8841 10.5222C15.4668 10.098 14.7902 10.098 14.3729 10.5222L11.3991 13.5455C11.17 13.7785 11.0573 14.1045 11.0925 14.4319L11.2626 16.0116C11.3069 16.4229 11.6263 16.7476 12.0308 16.7926L13.5847 16.9655C13.9067 17.0014 14.2274 16.8867 14.4565 16.6538L17.4303 13.6305C17.8475 13.2062 17.8475 12.5184 17.4303 12.0941L15.8841 10.5222ZM12.4324 14.413L15.1285 11.6719L16.2994 12.8623L13.6033 15.6034L12.5479 15.486L12.4324 14.413Z"
                                      fill="#01BF91" />
                            </svg>
                        </button>
                        <button class="btn btn-small btn-remove">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.91675 8.70834V13.4583" stroke="#EA004A" stroke-width="1.5"
                                      stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.0833 8.70834V13.4583" stroke="#EA004A" stroke-width="1.5"
                                      stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3.16675 5.54166H15.8334" stroke="#EA004A" stroke-width="1.5"
                                      stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M4.75 5.54166H9.5H14.25V14.25C14.25 15.5617 13.1867 16.625 11.875 16.625H7.125C5.81333 16.625 4.75 15.5617 4.75 14.25V5.54166Z"
                                      stroke="#EA004A" stroke-width="1.5" stroke-linecap="round"
                                      stroke-linejoin="round" />
                                <path d="M7.125 3.95833C7.125 3.08388 7.83388 2.375 8.70833 2.375H10.2917C11.1661 2.375 11.875 3.08388 11.875 3.95833V5.54167H7.125V3.95833Z"
                                      stroke="#EA004A" stroke-width="1.5" stroke-linecap="round"
                                      stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
                `)
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
                <label for="serviceName">Service name</label>
                <input type="text" id="serviceName" value="${res.serviceName}" placeholder="Service name">
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
                            <svg width="20" height="19" viewBox="0 0 20 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M5.65344 1.58334C3.68168 1.58334 2.08325 3.18177 2.08325 5.15353V13.8465C2.08325 15.8182 3.68168 17.4167 5.65344 17.4167H9.88118C10.2526 17.4167 10.5537 17.1156 10.5537 16.7442C10.5537 16.3727 10.2526 16.0716 9.88118 16.0716H5.65344C4.42454 16.0716 3.42833 15.0754 3.42833 13.8465V5.15353C3.42833 3.92463 4.42454 2.92842 5.65344 2.92842H14.1089C15.3378 2.92842 16.334 3.92463 16.334 5.15353V9.50001C16.334 9.87146 16.6351 10.1725 17.0066 10.1725C17.378 10.1725 17.6791 9.87146 17.6791 9.50001V5.15353C17.6791 3.18177 16.0806 1.58334 14.1089 1.58334H5.65344ZM6.04362 8.82733C5.67219 8.82733 5.37108 9.1284 5.37108 9.49985C5.37108 9.8713 5.67219 10.1724 6.04362 10.1724H8.41795C8.7894 10.1724 9.09047 9.8713 9.09047 9.49985C9.09047 9.1284 8.7894 8.82733 8.41795 8.82733H6.04362ZM5.37108 6.33493C5.37108 5.9635 5.67219 5.66239 6.04362 5.66239H10.791C11.1624 5.66239 11.4635 5.9635 11.4635 6.33493C11.4635 6.70637 11.1624 7.00747 10.791 7.00747H6.04362C5.67219 7.00747 5.37108 6.70637 5.37108 6.33493ZM15.8841 10.5222C15.4668 10.098 14.7902 10.098 14.3729 10.5222L11.3991 13.5455C11.17 13.7785 11.0573 14.1045 11.0925 14.4319L11.2626 16.0116C11.3069 16.4229 11.6263 16.7476 12.0308 16.7926L13.5847 16.9655C13.9067 17.0014 14.2274 16.8867 14.4565 16.6538L17.4303 13.6305C17.8475 13.2062 17.8475 12.5184 17.4303 12.0941L15.8841 10.5222ZM12.4324 14.413L15.1285 11.6719L16.2994 12.8623L13.6033 15.6034L12.5479 15.486L12.4324 14.413Z"
                                      fill="#01BF91" />
                            </svg>
                        </button>
                        <button class="btn btn-small btn-remove">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.91675 8.70834V13.4583" stroke="#EA004A" stroke-width="1.5"
                                      stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.0833 8.70834V13.4583" stroke="#EA004A" stroke-width="1.5"
                                      stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3.16675 5.54166H15.8334" stroke="#EA004A" stroke-width="1.5"
                                      stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M4.75 5.54166H9.5H14.25V14.25C14.25 15.5617 13.1867 16.625 11.875 16.625H7.125C5.81333 16.625 4.75 15.5617 4.75 14.25V5.54166Z"
                                      stroke="#EA004A" stroke-width="1.5" stroke-linecap="round"
                                      stroke-linejoin="round" />
                                <path d="M7.125 3.95833C7.125 3.08388 7.83388 2.375 8.70833 2.375H10.2917C11.1661 2.375 11.875 3.08388 11.875 3.95833V5.54167H7.125V3.95833Z"
                                      stroke="#EA004A" stroke-width="1.5" stroke-linecap="round"
                                      stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                `)
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
            dataType: 'json',
            success: function () {
                service.remove()
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
    $(".modal-fon").remove()
})

$(".input-form input").focus(function () {
    $(this).siblings(".placeholder").addClass("placeholder-active")
})
$(".input-form input").blur(function () {
    if ($(this).val() == "") {
        $(this).siblings(".placeholder").removeClass("placeholder-active")
    } else {
        $(this).addClass('input-focus')
    }
})