"use client";
import { useMemo, useState } from "react";
import { useDotFind } from "@/app/hooks/useDotFind";

type FindResolverProps = {
  account: string | null | undefined;
};

/*
for mainnet find info look here: https://github.com/findonflow/find/blob/main/integrating.md
*/

const FIND_PROFILE = "https://test.find.xyz/";
const FLOWSCAN_ROOT = "https://testnet.flowscan.org/account/";

export const AccountInfo = ({ account }: FindResolverProps) => {
  const [findName, setFindName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { onDotFind } = useDotFind();

  useMemo(() => {
    if (account) {
      setLoading(true);
      onDotFind(account)
        .then((findName) => {
          setFindName(findName);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [account]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div className="mr-3 w-100">
          Source Account:{" "}
          {!account && <span className="text-gray-500">Unknown</span>}
          {!findName && (
            <a
              className="text-blue-500 hover:text-blue-700"
              href={`${FLOWSCAN_ROOT}${account}`}
            >
              {account}
            </a>
          )}
          {findName && (
            <a
              className="text-blue-500 hover:text-blue-700"
              href={`${FIND_PROFILE}${account}`}
              target="_blank"
              rel="noreferrer"
            >
              {findName}.find
            </a>
          )}
        </div>
      )}
    </>
  );
};
