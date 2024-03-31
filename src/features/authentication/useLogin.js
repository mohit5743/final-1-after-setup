import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: (credential) => loginApi(credential),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("User logged in successfully");

      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.log("ERROR: ", error);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
