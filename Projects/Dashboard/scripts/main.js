function createElement(element, container, attributes, properties) {
    if (container != null) {
        var elementContainer = document.createElement(container);
    }

    var el = document.createElement(element);

    for (var attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
    }

    for (var property in properties) {
        el[property] = properties[property];
    }

    if (container != null) {
        elementContainer.appendChild(el);
        return elementContainer;
    }

    return el;
}

var dataContainer = document.querySelector("#data");

var itemsContainer = document.createElement("ul");

var mainCheckbox = document.createElement("input");
mainCheckbox.setAttribute("type", "checkbox");
mainCheckbox.addEventListener("change", function() {
    var checkboxes = document.querySelectorAll(".checkbox_item");
    console.log(mainCheckbox.checked);
    for (var i = 0; i < checkboxes.length; i++) {
        // add check for checkbox
        checkboxes[i].checked = mainCheckbox.checked;
    }
});

dataContainer.appendChild(mainCheckbox);

function printCollections (collectionsArray, collectionsContainer, objToIterate, attribute) {

    for (var i=0; i<collectionsArray.length; i++) {
        var collectionId = collectionsArray[i];
        for (var j=0;j<objToIterate.length; j++) {
            var collectionItem = objToIterate[j];
            if (collectionId==collectionItem.id) {
                var item = createElement("li", null, {}, {"textContent": collectionItem.name});
                item.setAttribute(attribute, collectionItem.id);
                collectionsContainer.appendChild(item);
            }
        }
    }

    return collectionsContainer;
}

for (var i = 0; i < items.length; i++) {
    var item = items[i];

    var itemContainer = document.createElement("li");
    var itemDataContainer = document.createElement("ul");
    var idContainer = document.createElement("li");
    var nameContainer = document.createElement("li");
    var descriptionContainer = document.createElement("li");
    var fileTypesContainer = document.createElement("li");


    /**
     * innerHtml - only for html content
     * innerText - not supported by firefox
     * textContent - purrrfect
     */

    idContainer.textContent = item.id;
    nameContainer.textContent = item.name;
    descriptionContainer.textContent = item.details.description;
    var fileTypes = item.filesTypes;


    //iterate through fileTypes
    for (var j= 0; j< fileTypes.length; j++) {
        var fileType = fileTypes[j];
        var fileTypeContainer = document.createElement("ul");

        var fileTypeFileName = createElement("li", null, {}, {"textContent": fileType.filename});
        fileTypeContainer.appendChild(fileTypeFileName);

        var fileTypeExtension = createElement("li", null, {}, {"textContent": fileType.extension});
        fileTypeContainer.appendChild(fileTypeExtension);

        var fileTypeDistributionContainer = document.createElement("li");
        for(var k=0; k<fileType.distributions.length;k++) {
            var distribution = fileType.distributions[k];
            var distributionList = document.createElement("ul");

            var distributionName = createElement("li", null, {}, {"textContent": distribution.name});
            var distributionPrice = createElement("li", null, {}, {"textContent": distribution.price});

            distributionList.appendChild(distributionName);
            distributionList.appendChild(distributionPrice);
            fileTypeDistributionContainer.appendChild(distributionList);
        }


        fileTypeContainer.appendChild(fileTypeDistributionContainer);
        fileTypesContainer.appendChild(fileTypeContainer);
    }




    //append data to item
    itemDataContainer.appendChild(idContainer);
    itemDataContainer.appendChild(nameContainer);
    itemDataContainer.appendChild(descriptionContainer);
    itemDataContainer.appendChild(fileTypesContainer);

    var colContainer = document.createElement("ul");
    var itemCollection = printCollections(item.collections, colContainer, collections, "data-col-id");
    itemDataContainer.appendChild(itemCollection);

    var tagContainer = document.createElement("ul");
    var itemTags = printCollections(item.tags, tagContainer, tags, "data-tag-id");
    itemDataContainer.appendChild(itemTags);

    var checkboxContainer = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "checkbox_item");
    checkboxContainer.appendChild(checkbox);
    itemDataContainer.appendChild(checkboxContainer);

    itemContainer.appendChild(itemDataContainer);
    itemsContainer.appendChild(itemContainer);


}


dataContainer.appendChild(itemsContainer);
