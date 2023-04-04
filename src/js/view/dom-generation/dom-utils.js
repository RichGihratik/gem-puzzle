function generateDom(context, textHtml) {
    context.innerHTML = "";
    context.insertAdjacentHTML("beforeend", textHtml);
    let elements = {};

    // Get all elements with ids
    context.querySelectorAll("*[id]").forEach((element) => {

        // Convert all ids to camelCase
        elements[(element.id)
            .split("-")
            .map((value, index) => {
                if (index !== 0) {
                    value = value[0].toUpperCase() + value.substring(1);
                }
                return value;
            })
            .join("")
        ] = element;
    });

    return elements;
}

export {
    generateDom
}