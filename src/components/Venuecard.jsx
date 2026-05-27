import styled from "styled-components";


function Venuecard({ title, votes, statusColor, statusText, onVote, image }) {
  return (
    <Card>
      <ImageWrapper>
        <img src={image} alt={title} />
      </ImageWrapper>

      <Title>{title}</Title>
      <Status>
        <Dot color={statusColor} />
        {statusText}
      </Status>

      <VoteButton onClick={onVote}>Jeg er her nå</VoteButton>
      <Votes>Stemmer: {votes}</Votes>
    </Card>
  );
}


export default Venuecard;

/* ---------------- STYLING ---------------- */

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  padding: 18px;
  box-shadow: 0 0 25px rgba(108, 99, 255, 0.2);
  backdrop-filter: blur(8px);
  color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 25px rgba(255, 0, 184, 0.3), 0 0 25px rgba(0, 170, 255, 0.3);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 190px;
  border-radius: 22px;
  overflow: hidden;
  margin-bottom: 15px;
  box-shadow: 0 0 30px rgba(255, 0, 184, 0.35);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


const FakeImg = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #6c63ff, #ff00b8);
`;

const Title = styled.h3`
  font-size: 28px;
  margin-bottom: 8px;
`;

const Status = styled.p`
  color: #c9c4ff;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => props.color};
`;

const VoteButton = styled.button`
  margin-top: 15px;
  padding: 10px 14px;
  border-radius: 20px;
  border: none;
  background: #ff00b8;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #ff33cc;
    box-shadow: 0 0 15px rgba(255, 0, 184, 0.6);
  }
`;

const Votes = styled.p`
  color: #00ff99;
  font-size: 16px;
  margin-top: 10px;
`;
