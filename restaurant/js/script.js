$(function () { // Same as document.addEventListener("DOMContentLoaded"...

    // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
    $("#navbar-btn").blur(function (event) {
        $("#collapsing-nav").collapse('hide');
    });
  
    // In Firefox and Safari, the click event doesn't retain the focus
    // on the clicked button. Therefore, the blur event will not fire on
    // user clicking somewhere else in the page and the blur event handler
    // which is set up above will not be called.
    // Refer to issue #28 in the repo.
    // Solution: force focus on the element that the click event fired on
    $("#navbarToggle").click(function (event) {
      $(event.target).focus();
    });
});
  
(function (global){

    var cc = {};

    var homeHtml = "snippets/home-snippet.html";
    var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";
    var menuItemsUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
    var menuItemsTitleHtml = "snippets/menu-items-title-snippet.html";
    var menuItemHtml = "snippets/menu-items-snippet.html"

    // Function to insert HTML to element
    var insertHtml = function (selector, html) {
        document.querySelector(selector).innerHTML = html;
    };

    // Function to show loading icon
    var showLoading = function (selector) {
        html = "<div class='text-center'><img src='images/loader.gif'></div>" 
        document.querySelector(selector).innerHTML = html;
    };

    // Function to replace {{propName}} with category item names
    var insertProperty = function(string, propertyName, propertyValue) {
        return string.replaceAll("{{"+propertyName+"}}", propertyValue);
    }

    // On page load
    document.addEventListener("DOMContentLoaded",
        function(event){
            showLoading("#main-content");
            $ajaxUtils.sendGetRequest(
                allCategoriesUrl,
                buildAndShowHomeHTML, 
                true); 
        });

    
    
    // Loads the menu categories view
    cc.loadMenuCategories = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allCategoriesUrl,
            buildAndShowCategoriesHTML);
        document.querySelector("#menu-button").classList.add("active");
        document.querySelector("#home-button").classList.remove("active");
    };

    cc.loadMenuItems = function (categoryShort) {
        $ajaxUtils.sendGetRequest(
            menuItemsUrl + categoryShort,
            buildAndShowMenuItemsHTML
        );
    }

    // Returns a random element from an array
    function chooseRandomCategory (categories) {
        return categories[Math.floor(Math.random() * categories.length)];
      }

    function buildAndShowHomeHTML(categories) {
        $ajaxUtils.sendGetRequest(
            homeHtml,
            function (homeHTML) {
                var chosenCategoryShortName = chooseRandomCategory(categories).short_name;
                var homeHtmlToInsertIntoMainPage = insertProperty(homeHTML, "randomShortName", chosenCategoryShortName);
                insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
            },
            false
        );
    }

    function buildAndShowCategoriesHTML(categories) {
        $ajaxUtils.sendGetRequest(
            categoriesTitleHtml,
            function (categoriesTitleHtml) {
                $ajaxUtils.sendGetRequest(
                    categoryHtml,
                    function (categoryHTML) {
                        insertHtml("#main-content",buildCategoriesViewHTML(categories,
                            categoriesTitleHtml,
                            categoryHTML));
                    },
                    false
                );
            },
            false
        );
    }

    function buildCategoriesViewHTML(categories, categoriesTitleHtml, categoryHTML) {
        finalCategories = categoriesTitleHtml + "<div class='row'>";

        // Loop over categories
        for (i of categories) {
            var html = categoryHTML;
            var name = i.name;
            var short_name = i.short_name;
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "shortname", short_name);
            finalCategories += html;
        }

        finalCategories += "</div>";
        return finalCategories;
    }

    function buildAndShowMenuItemsHTML(menuItems) {
        $ajaxUtils.sendGetRequest(
            menuItemsTitleHtml,
            function (menuItemsTitleHtml) {
                $ajaxUtils.sendGetRequest(
                    menuItemHtml,
                    function (menuItemHtml) {
                        insertHtml("#main-content",buildMenuItemsViewHTML(menuItems,
                            menuItemsTitleHtml,
                            menuItemHtml));
                    },
                    false
                );
            },
            false
        );
    }

    function buildMenuItemsViewHTML(menuItems, menuItemsTitleHtml, menuItemHtml) {
        var title = menuItems.category.name;
        var special_instructions = menuItems.category.special_instructions;
        var cat = menuItems.category.short_name;
        var titleHtml = menuItemsTitleHtml;
        titleHtml = insertProperty(titleHtml, "name", title);
        titleHtml = insertProperty(titleHtml, "special_instructions", special_instructions);
        finalMenuItems = titleHtml + "<div class='row'>";
        for (i of menuItems.menu_items) {
            var html = menuItemHtml;
            var name = i.name;
            var short_name = i.short_name;
            var description = i.description;
            var price_small = i.price_small;
            var price_large = i.price_large;
            if (price_small) {price_small = "$" + price_small};
            if (price_large) {price_large = "$" + price_large};
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "shortname", short_name);
            html = insertProperty(html, "description", description);
            html = insertProperty(html, "price_small", price_small);
            html = insertProperty(html, "price_large", price_large);
            html = insertProperty(html, "category", cat);
            finalMenuItems += html;
        };
        finalMenuItems += "</div>";
        return finalMenuItems;
    }

    global.$cc = cc;
})(window);