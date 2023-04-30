export default function Logo({navbar}) {
    return (
        <div className={navbar ? 'nav-logo' : 'logo'}>
            <h1>VTuber Connect</h1>
        </div>
    );
}