"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, "Minimum 3 characters"),
});

export const SignInCard = () => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const { data, status } = await postData("/auth", values);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-xl">
      <CardHeader
        title={
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Welcome back!
          </Typography>
        }
      />

      <Divider />

      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            fullWidth
            sx={{
              color: "#1f1f1f",
            }}
          >
            Login
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};