import FormLogin from "@/components/auth/form-login";
import Image from "next/image";

export default function Login() {
  return (
    <section className="login min-h-screen flex items-center ">
      <div className="login__wrapper mx-auto w-full max-w-7xl px-4 py-8 grid grid-cols-1 md:grid-cols-2 items-center gap-12 ">
        {/* LEFT*/}
        <div className="login__branding hidden md:flex flex-col items-center text-center">
          <Image
            className="mb-6"
            src="/login/clipboard-check.png"
            alt="icon"
            width={64}
            height={64}
          />
          <h2 className="text-3xl leading-tight max-w-sm">
            My-Task Let's <br /> Management Better
          </h2>
          <div className="relative w-full max-w-md aspect-square mt-10 ">
            <Image
              src="/login/task-manager-login-img.svg"
              alt="Team"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* RIGHT */}
        <FormLogin />
      </div>
    </section>
  );
}
