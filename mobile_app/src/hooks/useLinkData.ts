/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/module/index";
import { fetchCategories, fetchAllListRequest } from "../store/module/linkData";
import { useCallback } from "react";

export default function useLinkData() {
  const categories = useSelector(
    (state: RootState) => state.linkData.categories,
  );
  const all_category_url_list = useSelector(
    (state: RootState) => state.linkData.all_category_url_list,
  );
  const all_tag_list = useSelector(
    (state: RootState) => state.linkData.all_tag_list,
  );
  const categories_url_list = useSelector(
    (state: RootState) => state.linkData.categories_url_list,
  );
  const dispatch = useDispatch();

  const onHome = useCallback(
    (categoryData) => {
      dispatch(fetchCategories(categoryData));
    },
    [dispatch],
  );
  const fetchAllList = useCallback(() => {
    dispatch(fetchAllListRequest());
  }, [dispatch]);
  return {
    categories,
    all_category_url_list,
    all_tag_list,
    onHome,
    fetchAllList,
    categories_url_list,
  };
}
