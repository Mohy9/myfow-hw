import './Headline.scss';

interface Props {
  title: string;
}

export const Headline = ({ title }: Props) => {
  return (
    <div className='headline'>
      <h1 className='headline__title'>{title}</h1>
    </div>
  );
};
