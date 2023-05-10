"use client";
import { useState } from "react";

type FindResolverProps = {
  account: string | null | undefined;
};

const DOESNT_EXIST = "nil";
const FIND_PROFILE = "https://find.xyz/";
const FIND_URL = `https://lookup.find.xyz/api/lookup?address=`;
const FLOWSCAN_ROOT = "https://testnet.flowscan.org/account/";

export const AccountInfo = ({ account }: FindResolverProps) => {
  const [findName, setFindName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (account) {
    fetch(`${FIND_URL}${account}`)
      .then(async (response) => {
        if (!response.ok) {
          console.error("Network response was not ok");
        }
        const data = await response.text();
        if (data !== DOESNT_EXIST) {
          setFindName(data?.[0] || DOESNT_EXIST);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      {loading && <div>Loading ...</div>}
      <div className="m-3 w-100">
        <a href={`${FLOWSCAN_ROOT}${account}`}>{account}</a>
      </div>
      {findName && (
        <a href={`${FIND_PROFILE}${account}`} target="_blank" rel="noreferrer">
          {findName}
        </a>
      )}
    </>
  );
};
