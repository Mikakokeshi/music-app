import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SongList(props) {
    if (props.isLoading){
      return (
        <div className="inset-0 flex justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      ) };
  
    return (
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {

        Array(20)
          .fill()
          .map(() => {
            return (
              <div className="flex-none cursor-pointer ">
                <img
                  alt="thumbnail"
                  src={
                    'https://i.scdn.co/image/ab67616d0000b2738b7a8c1322028d45a8355f7a'
                  }
                  className="mb-2 rounded"
                />
                <h3 className="text-lg font-semibold">Song Name</h3>
                <p className="text-gray-400">By Artist</p>
              </div>
            );
          })}
      </div>
    );
  }