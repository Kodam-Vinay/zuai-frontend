import { useEffect } from "react";
import { getRequest } from "../api/apiCall";
import { useLocation } from "react-router-dom";
import { NAVIGATION_LINKS } from "../utils/constants";
import { useSelector } from "react-redux";

const useGetData = ({
  setData,
  setError,
  setIsError,
  apiUrl,
  isSearchClicked,
  setSearchClicked,
  setLoading,
}) => {
  const cofirmState = useSelector((store) => store?.popup?.confirm_state);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === NAVIGATION_LINKS.home.path) {
      setSearchClicked(false);
    }
  }, [isSearchClicked, pathname]);

  useEffect(() => {
    if (pathname === NAVIGATION_LINKS.home.path) {
      getData();
    }
  }, [isSearchClicked, pathname, cofirmState]);

  useEffect(() => {
    if (pathname !== NAVIGATION_LINKS.home.path) {
      getData();
    }
  }, [pathname, cofirmState]);

  const getData = async () => {
    setLoading(true);
    const res = await getRequest({
      apiUrl,
      setError,
      setIsError,
    });
    if (res?.status) {
      setIsError(false);
      setData(res?.data);
    } else {
      setIsError(true);
      setError(res?.message);
    }
    setLoading(false);
  };
};

export default useGetData;
