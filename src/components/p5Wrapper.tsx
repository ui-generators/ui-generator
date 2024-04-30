import dynamic from 'next/dynamic';

// Dynamically import the P5Wrapper component without server-side rendering
const P5Wrapper = dynamic(() => import('../components/p5Component'), {
    ssr: false,
});

export default P5Wrapper;
