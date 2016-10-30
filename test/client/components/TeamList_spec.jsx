import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';
import TeamList from '../../../src/client/components/TeamList';

describe('TeamList', () => {
  it('renders all team members', () => {
    const teamMembers = ["mary", "anna", "emma", "irene"];
    const component = renderIntoDocument(
      <TeamList team={"red"}
                teamMembers={teamMembers}
                currentUser={"kimberly"}
                joinTeam={null}
                setMastermind={null} />
    );

    const teamList = findRenderedDOMComponentWithClass(component, "teamList");
    const teamMember = scryRenderedDOMComponentsWithClass(component, "teamMember");

    expect(teamList.className).to.equal("teamList red");
    expect(teamMember.length).to.equal(teamMembers.length);
    let i = 0;
    teamMember.forEach((member) => {
      expect(member.textContent).to.equal(teamMembers[i++]);
    });
  });

  it('highlights team member if current user', () => {
    const teamMembers = ["kimberly", "anna", "emma", "irene"];
    const component = renderIntoDocument(
      <TeamList team={"blue"}
                teamMembers={teamMembers}
                currentUser={"kimberly"}
                joinTeam={null}
                setMastermind={null} />
    );

    const currentUser = findRenderedDOMComponentWithTag(component, "strong");

    expect(currentUser).to.be.ok;
    expect(currentUser.textContent).to.equal("kimberly");
  });

  it('displays join team and mastermind button when you can join the team', () => {
    const teamMembers = ["anna", "emma", "irene"];
    const component = renderIntoDocument(
      <TeamList team={"blue"}
                teamMembers={teamMembers}
                currentUser={"kimberly"}
                joinTeam={null}
                setMastermind={null} />
    );

    const joinTeam = scryRenderedDOMComponentsWithClass(component, "joinTeam");
    expect(joinTeam.length).to.equal(2);
  });

  it('does not display the join team button when you are in the team', () => {
    const teamMembers = ["anna", "emma", "irene", "kimberly"];
    const component = renderIntoDocument(
      <TeamList team={"blue"}
                teamMembers={teamMembers}
                currentUser={"kimberly"}
                joinTeam={null}
                setMastermind={null} />
    );

    const joinTeam = scryRenderedDOMComponentsWithClass(component, "joinTeam");
    expect(joinTeam.length).to.equal(1);
    expect(joinTeam[0].textContent).to.equal("+ Mastermind");
  });

  it('does not display the set mastermind button when you are the mastermind', () => {
    const teamMembers = ["anna", "emma", "irene"];
    const component = renderIntoDocument(
      <TeamList team={"blue"}
                teamMembers={teamMembers}
                currentUser={"kimberly"}
                mastermind={"kimberly"}
                joinTeam={null}
                setMastermind={null} />
    );

    const joinTeam = scryRenderedDOMComponentsWithClass(component, "joinTeam");
    expect(joinTeam.length).to.equal(1);
    expect(joinTeam[0].textContent).to.equal("+ Join Team");
  });

  it('calls the join team callback', () => {
    let joinInvoked = false;
    const join = () => joinInvoked = true;
    const teamMembers = ["anna", "emma", "irene"];
    const component = renderIntoDocument(
      <TeamList team={"blue"}
                mastermind={"kimberley"}
                teamMembers={teamMembers}
                currentUser={"kimberly"}
                joinTeam={join}
                setMastermind={null} />
    );

    const joinTeam = findRenderedDOMComponentWithClass(component, "joinTeam");
    Simulate.click(joinTeam);
    expect(joinInvoked).to.equal(true);
  });

  it('calls the set mastermind callback', () => {
    let setInvoked = false;
    const set = () => setInvoked = true;
    const teamMembers = ["kimberly", "anna", "emma", "irene"];
    const component = renderIntoDocument(
      <TeamList team={"blue"}
                teamMembers={teamMembers}
                currentUser={"kimberly"}
                joinTeam={null}
                setMastermind={set} />
    );

    const joinTeam = findRenderedDOMComponentWithClass(component, "joinTeam");
    Simulate.click(joinTeam);
    expect(setInvoked).to.equal(true);
  });
});

