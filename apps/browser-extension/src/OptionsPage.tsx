import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "./Logo";
import Spinner from "./Spinner";
import usePluginSettings from "./utils/settings";
import { api } from "./utils/trpc";

export default function OptionsPage() {
  const navigate = useNavigate();
  const { settings, setSettings } = usePluginSettings();

  const { data: whoami, error: whoAmIError } = api.users.whoami.useQuery(
    undefined,
    {
      enabled: settings.address != "",
    },
  );

  const { mutate: deleteKey } = api.apiKeys.revoke.useMutation();

  const invalidateWhoami = api.useUtils().users.whoami.refetch;

  useEffect(() => {
    invalidateWhoami();
  }, [settings, invalidateWhoami]);

  let loggedInMessage: React.ReactNode;
  if (whoAmIError) {
    if (whoAmIError.data?.code == "UNAUTHORIZED") {
      loggedInMessage = <span>Not logged in</span>;
    } else {
      loggedInMessage = (
        <span>Something went wrong: {whoAmIError.message}</span>
      );
    }
  } else if (whoami) {
    loggedInMessage = <span>{whoami.email}</span>;
  } else {
    loggedInMessage = <Spinner />;
  }

  const onLogout = () => {
    if (settings.apiKeyId) {
      deleteKey({ id: settings.apiKeyId });
    }
    setSettings((s) => ({ ...s, apiKey: "", apiKeyId: undefined }));
    invalidateWhoami();
    navigate("/notconfigured");
  };

  return (
    <div className="flex flex-col space-y-2">
      <Logo />
      <span className="text-lg">Settings</span>
      <hr />
      <div className="flex gap-2">
        <span className="my-auto">Logged in as:</span>
        {loggedInMessage}
      </div>
      <button className="rounded-lg border border-gray-200" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
