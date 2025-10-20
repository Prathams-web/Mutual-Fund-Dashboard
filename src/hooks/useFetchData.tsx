import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface APIResponse {
  responseCode: number;
  responseMessage: string;
  responseData: string | null;
  data: string | null;
}

export interface useFetchDataProps<T> {
  method?: "GET" | "POST" | "DELETE" | "PUT";
  endPoint: string;
  req?: any;
  /**
   * exucated on finally after api call
   * @param data
   * @param parsedData
   * @returns `void`
   */
  onFinally?: (data: APIResponse | undefined, parsedData?: T) => void;
  /**
   * exucated on case of `responseCode` `200`|| `201` || `204`
   * @param data
   * @param parsedData
   * @returns `void`
   */
  onSuccess?: (data: APIResponse | undefined, parsedData?: T) => void;
  defaultAPICall?: boolean;
  onBeforeAPICall?: () => void;
  noParsing?: true;
  isInternal?: boolean;
  reqHeaders?: Record<string, string | number | boolean>;
}
function useFetchData<T>({
  endPoint,
  method = "GET",
  req,
  onFinally,
  defaultAPICall,
  onBeforeAPICall,
  noParsing,
  isInternal,
  onSuccess,
  reqHeaders,
}: useFetchDataProps<T>) {
  const mainCaller = axios.create({
    headers: reqHeaders
      ? {
          ...reqHeaders,
        }
      : {
          "Content-Type": "application/json",
        },
  });
  const [hitAPI, setHitAPI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState<{ IsError: boolean; reason: any }>();
  const [response, setResponse] = useState<APIResponse>();
  const [data, setData] = useState<T>();

  async function getDataFromEndpoint() {
    onBeforeAPICall && onBeforeAPICall();
    setIsError(undefined);
    setLoading(true);
    let data: APIResponse | undefined;
    try {
      const { data }: { data: APIResponse } = await mainCaller({
        method: method,
        url: isInternal
          ? `${process.env.NEXT_PUBLIC_GATEWAY_INTERNAL_URI}${endPoint}`
          : `${endPoint}`,

        data: req,
      });
      console.log(data, "resData");
      setResponse(data);

      switch (data.responseCode) {
        case 200:
          try {
            if (data.data && data.data.trim() != "" && !noParsing) {
              const ParsedData: T | undefined = JSON.parse(data.data!);
              setData(ParsedData);
              if (onSuccess) {
                onSuccess(data, ParsedData);
              }
            } else if (!data.data) {
              if (onSuccess) {
                onSuccess(data);
              }
            }
          } catch (e) {
            console.log(e);
            setData(data?.data as T);
            onSuccess && onSuccess(data, data?.data as T);
          }
          break;

        default:
          // if (isNotification) {
          //   notification.warning({
          //     message: data.responseMessage,
          //   });
          // }
          break;
      }
      return data;
    } catch (err: any) {
      // notification.error({
      //   message: err.message,
      // });
      setIsError({
        IsError: true,
        reason: err,
      });
      setLoading(false);
    } finally {
      let parsedData: T | undefined = undefined;
      setLoading(false);
      if (data && data.responseCode == 200) {
        if (data.data && data.data.trim() != "" && !noParsing) {
          parsedData = JSON.parse(data.data!);
          setData(parsedData);
        } else {
          setData(data.data as any);
        }
      }

      onFinally && onFinally(data!, parsedData);
    }
    setLoading(false);
  }
  const ref = useRef(false);

  useEffect(() => {
    if (hitAPI || (!ref.current && defaultAPICall)) {
      if (endPoint) {
        setData(undefined);
        (async () => {
          await getDataFromEndpoint();
        })();
        ref.current = true;
      }
      setHitAPI(false);
    }
  }, [hitAPI, defaultAPICall, endPoint, getDataFromEndpoint]);
  return {
    data: data,
    setData,
    callAPI: setHitAPI,
    loading,
    isError,
    response,
  };
}

export default useFetchData;
