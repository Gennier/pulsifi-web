import Header from './header';

type LayoutProps = {
  children: any;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className='pt-10 px-10 h-screen bg-gray-100'>{children}</div>
    </>
  );
}
