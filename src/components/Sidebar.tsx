export default function Sidebar() {
    return (
        <div className="w-64 bg-white border-r border-gray-200 p-4">
            <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
            <ul>
                <li className="mb-2"><a href="#" className="text-blue-500 hover:underline">Link 1</a></li>
                <li className="mb-2"><a href="#" className="text-blue-500 hover:underline">Link 2</a></li>
                <li className="mb-2"><a href="#" className="text-blue-500 hover:underline">Link 3</a></li>
            </ul>
        </div>
    );
};