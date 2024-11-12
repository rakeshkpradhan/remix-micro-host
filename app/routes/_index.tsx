import * as React from 'react';
import { useLoaderData } from '@remix-run/react';

type LoaderData = {
    microFrontendUrl: string;
};

export const loader = async () => {
    return {
        microFrontendUrl: 'http://localhost:3001/server/index.js',
    };
};

// export async function loader() {
//     // Dynamically import the remote component
//     const remoteComponentModule = await import(/* webpackIgnore*/ 'http://localhost:3001/server/index.js');
  
//     // Extract the default export (the RemoteComponent)
//     const RemoteComponent = remoteComponentModule.default;
  
//     return { RemoteComponent };
//   }


  
const HomePage: React.FC<{ currentUser: string}> = ({ currentUser }) => (
    <div>
        <h2>Welcome to the Host App, {currentUser}!</h2>
    </div>
);

const MicroFrontendLoader: React.FC<{ url: string; currentUser: string}> = ({ url, currentUser}) => {

    const [MicroFrontend, setMicroFrontend] = React.useState<React.ComponentType<{currentUser:string}> | null> (null);

    // React.useEffect( () => {
    //     const loadMicroFrontend = async () => {
    //       const res = await import(/* webpackIgnore*/ url);
    //       console.log(res);
    //       setMicroFrontend(() => res.default);
    //     };
    // loadMicroFrontend();
    // }, [url]);
    React.useEffect( () => {
        const loadMicroFrontend = async () => {
          const res = await fetch(url);
          console.log(res);
          setMicroFrontend(() => res.text);
        };
    loadMicroFrontend();
    }, [url]);
    return MicroFrontend ? <MicroFrontend currentUser={currentUser} /> : <div>Loading ...</div>;
};


export default function Index() {
    const { microFrontendUrl } = useLoaderData<LoaderData>();

    return (
        <div>
            <h1>Micro Frontend Host</h1>
            <MicroFrontendLoader url={microFrontendUrl} currentUser="User" />
        </div>
    );
}