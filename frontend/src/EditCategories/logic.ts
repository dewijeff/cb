import {ListingCategory} from "../Shared/models";
import {AddDbCategory, EditDbCategory} from "../Shared/network";

export const UpdateCategories = async (newCategories: ListingCategory[]) => {
    // adds and updates - deletes handled individually and live.
    for (const category of newCategories) {
        category.order = newCategories.indexOf(category);
        if (category.id === undefined || category.id === null) {
            // update
            await AddDbCategory(category);
        } else {
            // add
            await EditDbCategory(category);
        }
    }
};