import SignInPage from "./(root)/auth/sign-in/page";

export default function Home() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      // style={{
      //   backgroundImage: "url('/images/Gm8olDpUJiTMWUSYlPzKalqawjzZ4Z41.jpg')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <SignInPage />      
    </div>
  );
}
