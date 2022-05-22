import Card from "react-bootstrap/Card";

function VolcanoVocab() {
  return (
    <div className="row">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>active volcano</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Noun</Card.Subtitle>
          <Card.Text>
            volcano that has had a recorded eruption since the last glacial
            period, about 10,000 years ago.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>dormant volcano</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Noun</Card.Subtitle>
          <Card.Text>
            volcano that has erupted in the past but is unlikely to erupt soon.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>erupt</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Verb</Card.Subtitle>
          <Card.Text>to explode or suddenly eject material.</Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>lava</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Noun</Card.Subtitle>
          <Card.Text>
            molten rock, or magma, that erupts from volcanoes or fissures in the
            Earth's surface.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>magma</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Noun</Card.Subtitle>
          <Card.Text>
            molten, or partially melted, rock beneath the Earth's surface.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>molten</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Adjective</Card.Subtitle>
          <Card.Text>solid material turned to liquid by heat.</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default VolcanoVocab;
