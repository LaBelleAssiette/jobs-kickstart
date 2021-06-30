import { useMemo } from "react";

const useSearchable = (ingredients, searchText, searchProps) => {
    return useMemo(() => {
        const regex = new RegExp(searchText, "i");
        if (ingredients.length) {

            return ingredients.filter((item) =>
            searchProps(item).some((sp) => regex.test(sp))
            );
        }
      }, [ingredients, searchText, searchProps]);
    };

export default useSearchable;