import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return { goTo, goBack };
};

export default useNavigation;
